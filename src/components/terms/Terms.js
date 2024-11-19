import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default class Terms extends React.Component {
    render() { 
        const DIALOG_TITLE = "Terms Of Service";
        const TERMS = [
            {
                title: "Last Updated: [13th November 2022]",
                text: ""
            },
            {
                title: "",
                text: `These terms of service ("Terms") apply to your access and use of [ococa] (the "Service"). Please read them carefully.`
            },
            {
                title: "Accepting these Terms",
                text: `If you access or use the Service, it means you agree to be bound by all of the terms below. So, before you use the Service, please read all of the terms. If you don't agree to all of the terms below, please do not use the Service.`
            },
            {
                title: "Changes to these Terms",
                text: `We reserve the right to modify these Terms at any time. For instance, we may need to change these Terms if we come out with a new feature or for some other reason. Whenever we make changes to these Terms, the changes are effective [in a week] after we post such revised Terms (indicated by revising the date at the top of these Terms) or upon your acceptance if we provide a mechanism for your immediate acceptance of the revised Terms (such as a click-through confirmation or acceptance button). It is your responsibility to check [ococa] for changes to these Terms. If you continue to use the Service after the revised Terms go into effect, then you have accepted the changes to these Terms.`
            },
            {
                title: "Third-Party Services",
                text: `From time to time, we may provide you with links to third party websites or services that we do not own or control. Your use of the Service may also include the use of applications that are developed or owned by a third party. Your use of such third party applications, websites, and services is governed by that party's own terms of service or privacy policies. We encourage you to read the terms and conditions and privacy policy of any third party application, website or service that you visit or use.`
            },
            {
                title: "Creating Accounts",
                text: `When you create an account or use another service to log in to the Service, you agree to maintain the security of your password and accept all risks of unauthorized access to any data or other information you provide to the Service. If you discover or suspect any Service security breaches, please let us know as soon as possible.`
            },
            {
                title: `Yuu Nozawa and Deborah Juniati ("ococa developers") 's material`,
                text: `We put a lot of effort into creating the Service including, the logo and all designs, text, graphics, pictures, information and other content (excluding your content). This property is owned by us or our licensors and it is protected by international copyright laws. We grant you the right to use it. However, unless we expressly state otherwise, your rights do not include: 
                (i) publicly performing or publicly displaying the Service; 
                (ii) modifying or otherwise making any derivative uses of the Service or any portion thereof; 
                (iii) using any data mining, robots or similar data gathering or extraction methods; 
                (iv) downloading (other than page caching) of any portion of the Service or any information contained therein; 
                (v) reverse engineering or accessing the Service in order to build a competitive product or service; or 
                (vi) using the Service other than for its intended purposes. 
                If you do any of this stuff, we may terminate your use of the Service.`
            },
            {
                title: "Hyperlinks and Third Party Content",
                text: `You may create a hyperlink to the Service. But, you may not use, frame or utilize framing techniques to enclose any of our trademarks, logos or other proprietary information without our express written consent. [ococa developers] makes no claim or representation regarding, and accepts no responsibility for third party websites accessible by hyperlink from the Service or websites linking to the Service. When you leave the Service, you should be aware that these Terms and our policies no longer govern. If there is any content on the Service from you and others, we don't review, verify or authenticate it, and it may include inaccuracies or false information. We make no representations, warranties, or guarantees relating to the quality, suitability, truth, accuracy or completeness of any content contained in the Service. You acknowledge sole responsibility for and assume all risk arising from your use of or reliance on any content.`
            },
            {
                title: "Unavoidable Legal Stuff",
                text: `The service and any other service and content included on or otherwise made available to you through the service are provided to you on an as is or as available basis without any representations or warranties of any kind. We disclaim any and all warranties and representations (express or implied, oral or written) with respect to the service and content included on or otherwise made available to you through the service whether alleged to arise by operation of law, by reason of custom or usage in the trade, by course of dealing or otherwise.

                In no event will [ococa developers] be liable to you or any third party for any special, indirect, incidental, exemplary or consequential damages of any kind arising out of or in connection with the service or any other service and/or content included on or otherwise made available to you through the service, regardless of the form of action, whether in contract, tort, strict liability or otherwise, even if we have been advised of the possibility of such damages or are aware of the possibility of such damages. Our total liability for all causes of action and under all theories of liability will be limited to the amount you paid to [ococa developers]. This section will be given full effect even if any remedy specified in this agreement is deemed to have failed of its essential purpose.

                You agree to defend, indemnify and hold us harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys' fees, costs, penalties, interest and disbursements) We incur in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party relating to your use of the service or the use of the service by any person using your account, including any claim that your use of the service violates any applicable law or regulation, or the rights of any third party, and/or your violation of these terms.`
            },
            {
                title: "Termination",
                text: `If you breach any of these Terms, we have the right to suspend or disable your access to or use of the Service.`
            },
            {
                title: "Entire Agreement",
                text: `These Terms constitute the entire agreement between you and [ococa developers] regarding the use of the Service, superseding any prior agreements between you and [ococa developers] relating to your use of the Service.`
            },
            {
                title: "Feedback",
                text: `Please let us know what you think of the Service, these Terms and, in general, [ococa]. When you provide us with any feedback, comments or suggestions about the Service, these Terms and, in general, [ococa], you irrevocably assign to us all of your right, title and interest in and to your feedback, comments and suggestions.`
            },
            {
                title: "Questions & Contact Information",
                text: `Questions or comments about the Service may be directed to us at the email address [ococa.app@gmail.com].`
            },
        ];
        const DialogContexts = [];
        TERMS.map((term, index) => {
            DialogContexts.push(
                <DialogContentText noWrap variant="h6" key={`title-${index}`} sx={{textDecoration:"underline"}}>{term.title}</DialogContentText>
            );
            DialogContexts.push(
                <DialogContentText paragraph key={`text-${index}`}>
                    {term.text.split('\n')?.map((str, index) => <React.Fragment key={index}>{str}<br/></React.Fragment>)}
                </DialogContentText>
            );
            return term;
        });
        return (
            <Dialog 
                open={this.props.open} 
                scroll='paper' 
                TransitionComponent={Transition} 
                onClose={this.props.closeDialog}
                fullWidth
                maxWidth="lg" >
                <DialogTitle variant="h5">{DIALOG_TITLE}</DialogTitle>
                <DialogContent dividers>{DialogContexts}</DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}