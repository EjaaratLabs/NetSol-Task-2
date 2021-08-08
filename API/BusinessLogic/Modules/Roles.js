const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class roles
{
    async createNewChannel(message)
    {
    
        var results=await client.Query("insert into channels(channelname) values(?)",
        [message.CHANNEL_NAME]);
    }
    async getAllRoles()
    {
    
        var results=await client.Query("Select * from roles",
        []);
        return results && results.length>0?results:[];
    }
    async getRoleDetailByUserId(id)
    {
    
        var results=await client.Query("Select roles.* from users inner join roles on users.RoleId=roles.RoleID",
        [id]);
        return results && results.length>0?results[0]:null;
    }
}
module.exports=new roles();