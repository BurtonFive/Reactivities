import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../feature/activities/dashboard/ActivityDashboard';
import agent from '../app/api/agent';
import LoadingComponent from './loadingComponent';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore(); 

  useEffect(() => {  
    activityStore.loadActivities();
  }, [activityStore])


  
if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>

    </>
  );
}

export default observer(App);
