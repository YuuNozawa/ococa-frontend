import React from 'react';

import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';

import axiosInstance from '../axios/axiosInstance';
import AppConst from '../components/shared/AppConst';

export const MoodContext = React.createContext();

function MoodException(messageID) {
    this.messageID = messageID;
    this.name = "MoodException";
}
export class MoodProvider extends React.Component {
    constructor(props) {
        super(props);
        this.getMood = (userId) => {
            return axiosInstance.get(`/api/mood`).then(res => {
                // 取得したdiaryのpictureIdに紐づくイメージをUnsplashから取得
                return this.getMoodWithImages(res.data, this.getLastPostDate(res.data.filter(r => r.userId === userId)))
                .then(moods => {
                    this.setState({moods: moods});
                    return moods; // Promise チェーンを継続
                });
            }).catch((error) => {
                console.error("mood取得失敗");
                console.error(error);
                throw error;
            });
        }
        this.setImagesByUid = (userId) => {
            this.setState((prevState) => {
                const newMoods = [...prevState.moods];
                this.getImagesByUid(newMoods, userId)
                .then(moods => {
                    this.setState({moods: moods});
                });
            });
        }
        this.getImagesByUid = async (moods, userId) => {
            const promises = moods
                .filter(m => m.userId === userId && m.endAt === null)
                .map(mood => {
                    if(!mood.pictureId || mood.url){return null;}
                    // if(!mood.pictureId) { return null; }
                    return axiosInstance.get("/api/Unsplash/photos/" + mood.pictureId)
                    .then(res =>{
                        if(res.data.urls) {
                            mood.url = `${res.data.urls.raw}&fm=jpg&w=220&fit=max`;
                            mood.alt = res.data.alt_description;
                        }
                    })
                    .catch((e) => {
                        switch( e.response.status ) {
                            case 404:
                                // When image might be deleted
                                mood.url = "";
                                mood.alt = "";
                                break;
                            default:
                                // When Unsplash might be down
                                console.error(e);
                                mood.url = "";
                                mood.alt = "";
                        }
                    });
                });
                await Promise.all(promises);
                return moods;
        }
        this.setMood = (moods) => {
            const newMoods = [...moods];
            this.setState({moods: newMoods});
        }
        this.getMoodWithImages = async (moods, range) => {
            // Promiseの配列
            const promises = moods
                .filter(m => isAfter(parseISO(m.startAt), range))
                .map(mood => {
                    if(!mood.pictureId || mood.url){return null;}
                    // if(!mood.pictureId) { return null; }
                    return axiosInstance.get("/api/Unsplash/photos/" + mood.pictureId)
                    .then(res =>{
                        if(res.data.urls) {
                            mood.url = `${res.data.urls.raw}&fm=jpg&w=220&fit=max`;
                            mood.alt = res.data.alt_description;
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        switch( e.response.status ) {
                            case 404:
                                // When image might be deleted
                                mood.url = "";
                                mood.alt = "";
                                break;
                            default:
                                // When Unsplash might be down
                                console.error(e);
                                mood.url = "";
                                mood.alt = "";
                        }
                    });
                });
            // Promise配列内部のPromiseを並列実行、戻り値はUnsplashのFetch結果の配列
            await Promise.all(promises);
            return moods;
        }
        this.getMoodStatus = () => {
            return axiosInstance.get("/api/mood/status/all")
            .then(res => {
                this.setState({status: res.data});
                return res.data; // Promise チェーンを継続
            }).catch((error) => {
                console.error("statusの取得失敗");
                console.error(error);
            });
        }
        this.getLastPostDate = (moods) => {
            const myMoods = moods.sort((a, b) => a.startAt < b.startAt ? 1 : -1);
            return myMoods ? startOfDay(parseISO(myMoods[0].startAt)) : null;
        }
        this.deleteMood = (id) => {
            return axiosInstance.delete(`/api/mood/${id}`)
            .then((res) => {
                this.setState((prevState) => { 
                    // 更新対象となったDocumentと一致する配列内の要素indexを取得
                    const idx = prevState.moods.findIndex(mood => mood.moodId === id);
                    // スプレッド構文でstateのmoodを展開してクローン
                    const newMoods = [...prevState.moods];
                    // クローンした配列のidx番目要素を削除
                    newMoods.splice( idx, 1);
                    // 新しいHistoriesでStateを更新
                    return {moods: newMoods};
                })
            })
            .catch((e) => {
                switch( e.response.status ) {
                    case 401:
                        throw new MoodException(AppConst.MSG407.getId());
                    default:
                        console.error(e);
                        throw new MoodException(AppConst.MSG405.getId());
                }
            });
        }
        this.favoriteMood = (mood) => {
            return axiosInstance.post(`/api/mood/${mood.moodId}/favorite`, {
                 "likeDate": new Date().toISOString()
                ,"timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then((res) => {
                if(res.status === 200) {
                    mood.likeCount++;
                    mood.likedByCurrentUser = true;
                }
                this.setUpdatedMood(mood);
            })
            .catch((e) => {
                switch( e.response.status ) {
                    case 401:
                        throw new MoodException(AppConst.MSG407.getId());
                    default:
                        console.error(e);
                        throw new MoodException(AppConst.MSG405.getId());
                }
            });
        }
        this.cancelFavorite = (mood) => {
            return axiosInstance.delete(`/api/mood/${mood.moodId}/favorite`)
            .then((res) => {
                if(res.status === 200) {
                    mood.likeCount--;
                    mood.likedByCurrentUser = false;
                }
                this.setUpdatedMood(mood);
            })
            .catch((e) => {
                switch( e.response.status ) {
                    case 401:
                        throw new MoodException(AppConst.MSG407.getId());
                    default:
                        console.error(e);
                        throw new MoodException(AppConst.MSG405.getId());
                }
            });
        }
        this.setUpdatedMood = (newMood) => {
            this.setState((prevState) => { 
                // 更新対象となったDocumentと一致する配列内の要素indexを取得
                const idx = prevState.moods.findIndex(mood => mood.moodId === newMood.moodId);
                // スプレッド構文でstateのmoodを展開してクローン
                const newMoods = [...prevState.moods];
                if(idx > -1) {
                    // クローンした配列のidx番目要素を1つ取り出してnewMoodに置き換え
                    newMoods.splice( idx, 1, newMood);
                } else {
                    newMoods.unshift(newMood);
                }
                // 新しいHistoriesでStateを更新
                return {moods: newMoods};
            })
        }
        this.state= {
            moods: null,
            status: null,
            getMood: this.getMood,
            setMood: this.setMood,
            getMoodWithImages: this.getMoodWithImages,
            getImagesByUid: this.getImagesByUid,
            getMoodStatus: this.getMoodStatus,
            getLastPostDate: this.getLastPostDate,
            setImagesByUid: this.setImagesByUid,
            deleteMood: this.deleteMood,
            favoriteMood: this.favoriteMood,
            cancelFavorite: this.cancelFavorite,
            setUpdatedMood: this.setUpdatedMood,
        };
    }
    render(){
        return(
            <MoodContext.Provider value={this.state}>
                {this.props.children}
            </MoodContext.Provider>
        )
    }
}