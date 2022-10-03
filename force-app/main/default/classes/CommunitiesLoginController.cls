/**
 * An apex page controller that exposes the site login functionality
 */
global with sharing class CommunitiesLoginController {

    global CommunitiesLoginController () {}
    
    // Code we will invoke on page load.
    global PageReference forwardToAuthPage() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        String displayType = System.currentPageReference().getParameters().get('display');
        String expid = System.currentPageReference().getParameters().get('expid');
        return Network.forwardToAuthPage(startUrl, displayType);
        
    }


global PageReference forwardToCustomAuthPage() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
                String expid = System.currentPageReference().getParameters().get('expid');

        if(expid=='coffee'){
        return new PageReference(Site.getPathPrefix() + '/CustomLoginPage?startURL=' + EncodingUtil.urlEncode(startURL, 'UTF-8'));
    }
    else{
            return new PageReference(Site.getPathPrefix() + '/CustomLoginPage1?startURL=' + EncodingUtil.urlEncode(startURL, 'UTF-8'));

    }

}
}