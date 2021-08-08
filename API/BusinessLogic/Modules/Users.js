const dbmgr=require('../../../custom_modules/dbInstance');
var client=dbmgr.getDbClient();

class users
{
    async createNewUser(message)
    {
    
        var results=await client.Query("insert into users(UserName,Name,Password,Email,Phone,Address,Status,ChannelId,RoleId,CenterId,createdby,updateby) values(?,?,?,?,?,?,?,?,?,?,?,?)",
        [message.USER_NAME,message.NAME,message.PASSWORD,message.EMAIL,message.PHONE,message.ADDRESS,"1",message.CHANNEL_ID,message.ROLE_ID,message.CENTER_ID,message.API_USER_ID,message.API_USER_ID]);
    }
    async getAllUsers()
    {
    
        var results=await client.Query("Select users.* , centers.name as centername from users inner join centers on users.CenterId=centers.id",
        []);
        return results && results.length>0?results:[];
    }
    async getUserbyUserName(userId)
    {
    
        var results=await client.Query("Select users.*,centers.name as centername,channels.Abbr as channelAbbr from users inner join centers on users.CenterId=centers.id inner join channels on users.channelId=channels.channelId where UserName=?",
        [userId]);
        return results && results.length>0?results[0]:null;
    }
    async updateUserPassword(message)
    {
    
        var results=await client.Query("update users set Password=? where UserName=? ",
        [message.PASSWORD, message.API_USER_ID ,message.OLD_PASSWORD]);
    }
    async updateUserDetails()
    {
        var results=await client.Query("update users set Name=?, Phone=?, Email=?, Address=?, RoleId=?, CenterId=? where UserName=?" , 
        [message.NAME, message.PHONE, message.EMAIL, message.ADDRESS, message.ROLE_ID, message.CENTER_ID, message.API_USER_ID]);
    }
}
module.exports=new users();