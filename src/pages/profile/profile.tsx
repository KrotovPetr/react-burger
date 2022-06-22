import React, { FC } from 'react';
import profileStyles from './profile.module.css';
import { Route, Switch } from 'react-router-dom';
import '../../commonStyles/styles.css';
import ProfileHeader from '../../Components/profileComponents/profileHeader/profile-header';
import ProfileMain from '../../Components/profileComponents/profileMain/profile-main';
import ProfileOrders from '../../Components/profileComponents/profileOrders/profile-orders';

const Profile: FC = () => {
    return (
        <div className={profileStyles.commonContainer}>
            <div className={profileStyles.subRouterContainer}>
                <ProfileHeader />
            </div>
            <div className={profileStyles.formContainer}>
                <Switch>
                    <Route exact path="/profile">
                        <ProfileMain />
                    </Route>
                    <Route path="/profile/orders">
                        <ProfileOrders />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

//propTypes - нету
export default Profile;
