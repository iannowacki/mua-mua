import React, { useEffect, useState } from 'react';
import { TextInput, View, Button, Text, ActivityIndicator } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db from '../db/firestore';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../styles/global';
import TaskForm from '../components/TaskForm';


const UpdateTask = () => {

    const navigation = useNavigation()
    const route =useRoute()

    const [name, setName] = useState('')

    const {taskId} = route.params

    useEffect(() => {
        db.collection('tasks')
        .doc(taskId)
        .get()
        .then(doc => {
            if (doc) {
                const name = doc.data()?.name
                setName(name)
            } else {
                throw new Error('booking-non-existant')
            }
        })
    }, [taskId])

    return (
        <View>
            {
                name 
                    ? <TaskForm onSubmit={(values => {
                
                        db.collection('tasks').doc(taskId).update({
                            name: values.name
                        }).then(result => navigation.goBack())
                          .catch(err => console.log(err))
                })} name={name} btnValue={'Update'}/>
                : <ActivityIndicator size={"large"} />    
            }
            
        </View>
    )
}

export default UpdateTask


