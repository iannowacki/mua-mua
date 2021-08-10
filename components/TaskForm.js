import React from 'react';
import { TextInput, View, Button, Text } from 'react-native';
import { Formik, validateYupSchema } from 'formik';
import db from '../db/firestore';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/global';

const FormProps = {
    name: String
}

const Props = {
    onSubmit,
    name,
    btnValue
}

const TaskForm = ({onSubmit, name, btnValue}) => {

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
    })

    return(
        <Formik 
              initialValues={{name: ''}}
              onSubmit={(values) => {
                db.collection('tasks').add({
                    name: validateYupSchema.name,
                    createdAt: new Date(),
                    completedAt: null,
                }).then(result => navigation.navigate('NewBookingScreen'))
                  .catch(err => console.log(err))
              }}
              validationSchema={validationSchema}
            >
                {({
                    values, 
                    handleChange, 
                    errors,
                    handleSubmit}) => {
                    <View>
                        <TextInput
                        onChangeText={handleChange('name')}
                        placeholder={'Describe Task'}
                        value={values.name}
                        autoFocus={true} />
                        { errors['name'] ? <Text>{errors['name']}</Text> : null }
                        <Button title={'Create'} onPress ={()=> handleSubmit()} />
                    </View>
                }

                }
            </Formik>
        // < Formik
        //         initialValues={{name: '', weddingDate: '', venuePostcode: '', numberOfMakeups: ''}}
        //         onSubmit={onSubmit}
        //     >
                
        //         {(formikProps) => (
        //             <View>
        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='name'
        //                 onChangeText={formikProps.handleChange('name')}
        //                 value={formikProps.values.name}
        //                 >
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Wedding Date'
        //                 onChangeText={formikProps.handleChange('weddingDate')}
        //                 value={formikProps.values.weddingDate}
        //                 >
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Venue Postcode'
        //                 onChangeText={formikProps.handleChange('venuePostcode')}
        //                 value={formikProps.values.venuePostcode}> 
        //                 </TextInput>

        //                 <TextInput style={globalStyles.newBookForm} 
        //                 placeholder='Number of makeups'
        //                 onChangeText={formikProps.handleChange('numberOfMakeups')}
        //                 value={formikProps.values.numberOfMakeups}
        //                 keyboardType='numeric'> 
        //                 </TextInput>

        //                 <Button title={btnValue} color='maroon' onPress={formikProps.handleSubmit}/>
        //                 {/* <Button title='sumbit' color='maroon' onPress={()=>alert("Always don't be not alert")}/> */}
        //             </View>
        //         )}
        //     </Formik>
    )
}
export default TaskForm