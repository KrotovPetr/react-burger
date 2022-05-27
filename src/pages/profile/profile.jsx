import React, { useEffect, useState } from 'react';
import profileStyles from './profile.module.css';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import '../../commonStyles/styles.css';
import ProfileHeader from '../../Components/profileComponents/profileHeader/profile-header';
import ProfileMain from '../../Components/profileComponents/profileMain/profile-main';
import ProfileOrders from '../../Components/profileComponents/profileOrders/profile-orders';

const Profile = () => {
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

export default Profile;
