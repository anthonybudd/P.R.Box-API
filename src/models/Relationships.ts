import User from './User';
import GroupUser from './GroupUser';
import Group from './Group';
import PRBox from './PRBox';
import PKG from './Package';


User.belongsToMany(Group, {
    through: GroupUser,
    foreignKey: 'userID',
    otherKey: 'groupID',
});
Group.belongsToMany(User, {
    through: GroupUser,
    foreignKey: 'groupID',
    otherKey: 'userID',
});

PRBox.hasMany(PKG);
