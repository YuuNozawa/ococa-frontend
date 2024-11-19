import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import FavoriteIcon from '@mui/icons-material/Favorite';
export class SimpleConst {
    constructor(label, value){
        Object.defineProperty( this, 'label', {value: label} );
        Object.defineProperty( this, 'value', {value: value} );
    }
    getLabel = () => {
        return this.label;
    }
    getValue = () => {
        return this.value;
    }
}
export class Mode {
    constructor(label, value, showNavigation, Icon){
        Object.defineProperty( this, 'label', {value: label} );
        Object.defineProperty( this, 'value', {value: value} );
        Object.defineProperty( this, 'showNavigation', {value: showNavigation} );
        Object.defineProperty( this, 'Icon', {value: Icon} );
    }
    getLabel = () => {
        return this.label;
    }
    getValue = () => {
        return this.value;
    }
    getShowNavigation = () => {
        return this.showNavigation;
    }
    getIcon = (props) => {
        return(<this.Icon {...props}/>);
    }
}
export class Emo {
    constructor(id, Icon, ...labels){
        Object.defineProperty( this, 'id', {value: id} );
        Object.defineProperty( this, 'Icon', {value: Icon} );
        Object.defineProperty( this, 'labels', { value: {...labels} } );
    }
    getId = () => {
        return this.id;
    }
    getIcon = (props) => {
        return(<this.Icon {...props}/>);
    }
    getLabelByLevel = (level) => {
        if(!this.labels[level]) return "";
        return this.labels[level];
    }
}
export class Tag extends React.Component{
    constructor(id, value){
        super();
        Object.defineProperty( this, 'id', {value: id} );
        Object.defineProperty( this, 'value', {value: value} );
    }
    getId = () => {
        return this.id;
    }
    getValue = () => {
        return this.value;
    }
}
export class Message {
    constructor(id, message, messageType){
        Object.defineProperty( this, 'id', {value: id} );
        Object.defineProperty( this, 'message', {value: message} );
        Object.defineProperty( this, 'messageType', {value: messageType} );
    }
    getId = () => {
        return this.id;
    }
    getMessage = () => {
        return this.message;
    }
    getMessageType = () => {
        return this.messageType;
    }
}
export default class SystemConst {
    /** Emo constants */
    static JOY                 = new Emo("e01", MoodIcon, "happy", "happyy", "happyyy" );
    static JOY_COLOR           = new Emo("e01", MoodIcon, "#FFF7AA", "#FFEE55", "#FFE600" );
    static JOY_COLOR_RGB       = new Emo("e01", MoodIcon, "255,247,170", "255,238,85", "255,230,0" );
    static FEAR                = new Emo("e03", SentimentDissatisfiedIcon, "worried", "very worried", "super worried" );
    static FEAR_COLOR          = new Emo("e03", SentimentDissatisfiedIcon, "#91DBB9", "#3DB680", "#009250" );
    static FEAR_COLOR_RGB      = new Emo("e03", SentimentDissatisfiedIcon, "145,219,185", "61,182,128", "0,146,80" );
    static SADNESS             = new Emo("e05", SentimentSatisfiedIcon, "sad", "so sad", "..." );
    static SADNESS_COLOR       = new Emo("e05", SentimentSatisfiedIcon, "#9ACDE7", "#45A1CF", "#007AB7" );
    static SADNESS_COLOR_RGB   = new Emo("e05", SentimentSatisfiedIcon, "154,205,231", "69,161,207", "0,122,183" );
    static ANGER               = new Emo("e07", MoodBadIcon, "Angry", "Angryy", "Angryyy" );
    static ANGER_COLOR         = new Emo("e07", MoodBadIcon, "#ECACB5", "#DA6272", "#C7243A" );
    static ANGER_COLOR_RGB     = new Emo("e07", MoodBadIcon, "236,172,181", "218,98,114", "199,36,58" );
    // static TRUST               = new Emo("e02", null, "acceptance", "trust", "admiration" );
    // static TRUST_COLOR        = new Emo("e02", null, "#DFECAA", "#C0D860", "#A4C520" );
    // static SURPRISE            = new Emo("e04", null, "distraction", "surprise", "amazement" );
    // static SURPRISE_COLOR     = new Emo("e04", null, "#97D3E3", "#42AAC7", "#0086AB" );
    // static DISGUST             = new Emo("e06", null, "boredom", "disgust", "loathing" );
    // static DISGUST_COLOR      = new Emo("e06", null, "#DBA6CC", "#B75C9D", "#932674" );
    // static ANTICIPATION        = new Emo("e08", null, "interest", "anticipation", "vigilance" );
    // static ANTICIPATION_COLOR = new Emo("e08", null, "#F9E3AA", "#F3C759", "#EDAD0B" );
    /** Mode constants */
    static NEW = new Mode("Diary", 1, false, MenuBookIcon );
    static HOME = new Mode("Home", 2, true, HomeIcon );
    static TIMELINE = new Mode("TimeLine", 3, true, ViewTimelineIcon );
    static INSIGHT = new Mode("Insight", 4, true, BarChartIcon );
    static PROFILE = new Mode("Profile", 5, false, AccountCircleIcon );
    static RELATION = new Mode("Friends", 6, true, SupervisedUserCircleIcon );
    static SETTING = new Mode("Setting", 7, true, SettingsIcon );
    static LOGIN = new Mode("Login", 8, false, null );
    static WELCOME = new Mode("Welcome", 9, false, null );
    static PASSWORD = new Mode("Password", 10, false, LockIcon );
    static SIGNUP = new Mode("Signup", 11, false, null );
    static ABOUTUS = new Mode("AboutUs", 12, false, null );
    static PRIVACY = new Mode("Privacy", 13, false, VerifiedUserIcon );
    static MOOD = new Mode("Mood", 14, false, null );
    static TERMS = new Mode("Terms", 15, false, null );
    static INFO = new Mode("Info", 16, false, InfoIcon );
    static CALLBACK = new Mode("Callback", 17, false, null );
    static LOGOUT = new Mode("Logout", 18, false, null );
    /** Tag constants */
    static TAG01 = new Tag("t01", "Family | Relationship");
    static TAG02 = new Tag("t02", "Health | Wellness");
    static TAG03 = new Tag("t03", "Travel | Experience");
    static TAG04 = new Tag("t04", "Work | Education");
    static TAG05 = new Tag("t05", "Home | Living");
    /** Relation constants */
    static MY_FRIENDS = new Mode("My Friends", 0, true, PeopleIcon );
    static REQUESTS = new Mode("Requests", 1, true, EmojiPeopleIcon );
    static ADD_FRIENDS = new Mode("Add Friends", 2, true, PersonAddIcon );
    static BLOCKS = new Mode("blocks", 3, false, BlockIcon );
    static VIEWERS = new Mode("viewers", 4, false, VisibilityIcon );
    static FAVORITES = new Mode("Feel You", 5, false, FavoriteIcon );
    /** Title constants: Mood Register */
    static MOOD_TITLE00 = new SimpleConst("Select your Mood", 0);
    static MOOD_TITLE01 = new SimpleConst("Select Mood level", 1);
    static MOOD_TITLE02 = new SimpleConst("Select Mood category", 2);
    static MOOD_TITLE03 = new SimpleConst("Describe your Situation", 3);
    static MOOD_TITLE04 = new SimpleConst("Add Image", 4);
    /** Title constants: Insight Manager */
    static CHART_TITLE01 = new SimpleConst("Overview", 1);
    static CHART_TITLE02 = new SimpleConst("Share of mood per tag", 2);
    static CHART_TITLE03 = new SimpleConst("Summary", 3);
    /** Mode constants: Insight Manager */
    // static TOTAL_TIME = new Mode("Total time", 1, false, AccessTimeIcon );
    // static TOTAL_RECORDS = new Mode("Total number of times", 2, false, ShowChartIcon );
    static TOTAL_TIME = 1;
    static TOTAL_RECORDS = 2;
    /** Other constants: message types */
    static MSG_TYPE_INFO = "info";
    static MSG_TYPE_SUCCESS = "success";
    static MSG_TYPE_WARNING = "warning";
    static MSG_TYPE_ERROR = "error";
    /** Message constants */
    // INFO
    static MSG101 = new Message("m101", "No mood recorded yet", this.MSG_TYPE_INFO);
    static MSG102 = new Message("m102", "No Result", this.MSG_TYPE_INFO);
    static MSG103 = new Message("m103", "Password changed successfully!", this.MSG_TYPE_INFO);
    static MSG104 = new Message("m104", "Profile changed successfully!", this.MSG_TYPE_INFO);
    static MSG105 = new Message("m105", "Setting changed successfully!", this.MSG_TYPE_INFO);
    // WARNING
    static MSG301 = new Message("m301", "Caps Lock is on", this.MSG_TYPE_WARNING);
    // ERROR
    static MSG401 = new Message("m401", "Incorrect ID or password", this.MSG_TYPE_ERROR);
    static MSG402 = new Message("m402", "ID is already taken", this.MSG_TYPE_ERROR);
    static MSG403 = new Message("m403", "Maximum number of attempts has been exceeded. Please check your internet environment.", this.MSG_TYPE_ERROR);
    static MSG404 = new Message("m404", "End time should not be earlier than start time.", this.MSG_TYPE_ERROR);
    static MSG405 = new Message("m405", "Woops! something went wrong.", this.MSG_TYPE_ERROR);
    static MSG406 = new Message("m406", "User not found", this.MSG_TYPE_ERROR);
    static MSG407 = new Message("m407", "Your session has expired. please login again.", this.MSG_TYPE_ERROR);
    static MSG408 = new Message("m408", "Please fill out this field", this.MSG_TYPE_ERROR);
    static MSG409 = new Message("m409", "Please make sure your password match", this.MSG_TYPE_ERROR);
    static MSG410 = new Message("m410", "Check your connection and try again.", this.MSG_TYPE_ERROR);
    /** Other constants:  */
    static APP_TITLE = new SimpleConst("ococa", null);
    static STRONG = 2;
    static MILD = 1;
    static WEAK = 0;
    /** Other constants: format for datefns format method */
    static FORMAT_DATE = "EEEE, LLLL dd";
    static FORMAT_DATE2 = "dd LLL yyyy";
    static FORMAT_DATE3 = "LLLL yyyy";
    static FORMAT_DATE4 = "yyyy";
    static FORMAT_TIME_1 = "hh:mm aaa";
    static FORMAT_TIME_2 = "HH:mm";
    /** Other constants: message types */
    static TIME_SPAN = ["Day", "Week", "Month", "Year"];
    /** Other constants: slider config */
    static MARKS = [
        { value: 0 },
        { value: 1 },
        { value: 2 },
    ];

    /** Getter */
    static getEmos = () => { return [this.JOY, this.FEAR, this.SADNESS, this.ANGER];}
    static getColors = () => { return [this.JOY_COLOR, this.FEAR_COLOR, this.SADNESS_COLOR, this.ANGER_COLOR]; }
    static getColorsRgb = () => { return [this.JOY_COLOR_RGB, this.FEAR_COLOR_RGB, this.SADNESS_COLOR_RGB, this.ANGER_COLOR_RGB]; }
    static getMode = () => {
        return [this.NEW, this.HOME, this.TIMELINE, this.INSIGHT, this.PROFILE, this.RELATION, this.SETTING, this.LOGIN, this.WELCOME, this.PASSWORD, this.SIGNUP, this.ABOUTUS, this.PRIVACY, this.MOOD, this.TERMS, this.INFO ];
    }
    static getFriendTypes = () => {
        return [this.MY_FRIENDS, this.REQUESTS, this.ADD_FRIENDS, this.BLOCKS, this.VIEWERS];
    }
    static getTags = () => {
        return [this.TAG01, this.TAG02, this.TAG03, this.TAG04, this.TAG05 ];
    }
    static getMoodTitles = () => {
        return [this.MOOD_TITLE00, this.MOOD_TITLE01, this.MOOD_TITLE02, this.MOOD_TITLE03, this.MOOD_TITLE04 ];
    }
    static getChartTitles = () => {
        return [this.CHART_TITLE01, this.CHART_TITLE02, this.CHART_TITLE03 ];
    }
    static getMessages = () => {
        return [
            this.MSG101, this.MSG102, this.MSG103, this.MSG104, this.MSG105,
            this.MSG301, 
            this.MSG401, this.MSG402, this.MSG403, this.MSG404, this.MSG405, this.MSG406, this.MSG407 ,this.MSG408 ,
            this.MSG409, this.MSG410
        ];
    }
    static getModeByValue = (value) => {
        const mode = this.getMode();
        const idx = mode.findIndex(mode => mode.value === value);
        if (idx > -1) {
            return mode[idx];
        }
        return null;
    }
    static getEmoById = (id) => {
        const emos = this.getEmos();
        const idx = emos.findIndex(color => color.id === id);
        if (idx > -1) {
            return emos[idx];
        }
        return null;
    }
    static getColorById = (id) => {
        const colors = this.getColors();
        const idx = colors.findIndex(color => color.id === id);
        if (idx > -1) {
            return colors[idx];
        }
        return null;
    }
    static getColorRgbById = (id) => {
        const colors = this.getColorsRgb();
        const idx = colors.findIndex(color => color.id === id);
        if (idx > -1) {
            return colors[idx];
        }
        return null;
    }
    static getTagById = (id) => {
        const tags = this.getTags();
        const idx = tags.findIndex(tag => tag.id === id);
        if (idx > -1) {
            return tags[idx];
        }
        return null;
    }
    static getMoodTitleByStep = (step) => {
        const titles = this.getMoodTitles();
        const idx = titles.findIndex(title => title.getValue() === step);
        if (idx > -1) {
            return titles[idx].getLabel();
        }
        return null;
    }
    static getChartTitleByStep = (step) => {
        const titles = this.getChartTitles();
        const idx = titles.findIndex(title => title.getValue() === step);
        if (idx > -1) {
            return titles[idx].getLabel();
        }
        return null;
    }
    static getMessageById = (id) => {
        const messages = this.getMessages();
        const idx = messages.findIndex(msg => msg.id === id);
        if (idx > -1) {
            return messages[idx]
        }
        return null;
    }
    static getSingleEmo = (id, level) => {
        const emos = this.getEmoById(id);
        if(emos && level < 3) {
            return emos.getLabelByLevel(level);
        }
        return "";
    }
    static getSingleColor = (id, level) => {
        const colors = this.getColorById(id);
        if(colors && level < 3) {
            return colors.getLabelByLevel(level);
        }
        return "#FFFF";
    }
    static getSingleColorRgb = (id, level) => {
        const colors = this.getColorRgbById(id);
        if(colors && level < 3) {
            return colors.getLabelByLevel(level);
        }
        return "255,255,255";
    }
}

