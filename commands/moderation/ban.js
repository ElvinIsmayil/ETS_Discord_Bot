module.exports = {
    name:'ban',
    description:'Bans a user',
    permissions:['Administrator'],
    requiredRoles:[],
    cooldown: 0,
    hidden:false,
    devOnly: false,
    execute(client,message){
        const member = message.mentions.users.first();
        if (member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.ban();
            message.channel.send('User has been banned');
        }else{
            message.channel.send('You could not ban the user');
        }
    }
}