/**
 * An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
public with sharing class CommunitiesLandingController {
    
    // Code we will invoke on page load.
    public PageReference forwardToStartPage() {
       // return Network.communitiesLanding();
            String communityUrl = 'https://testkey22-developer-edition.na162.force.com/MyFirstCommunity/s/user1home'; //URL of new page
     return new PageReference(communityUrl);   

    }
    
    public CommunitiesLandingController() {}
    
   public PageReference forwardToCustomAuthPage() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        return new PageReference(Site.getPathPrefix() + '/CustomLoginPage?startURL=' + EncodingUtil.urlEncode(startURL, 'UTF-8'));
    }

}