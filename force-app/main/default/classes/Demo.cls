public class Demo {

    public void listMethod(){
        List<String> strList = new List<String>();
        strList.add('India');
        strList.add('USA');
        strList.add('UK');
        system.debug('Listobj='+strList);
          
       List<Account> accList = new List<Account>();
         accList = [Select  id,name from Account LIMIT 2];       
                system.debug('Accountobj='+accList);

    }
}