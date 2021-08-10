// import React from 'react';
// import { TextInput, View, Button, Text } from 'react-native';
// import { Formik, validateYupSchema } from 'formik';
// import db from '../db/firestore';
// import * as yup from 'yup';
// import { useNavigation } from '@react-navigation/native';
// import { globalStyles } from '../styles/global';

// const FormProps = {
//     name: String
// }

// const Props = {
//     onSubmit,
//     name,
//     btnValue
// }

// const TaskForm = ({onSubmit, name, btnValue}) => {

//     const validationSchema = yup.object().shape({
//         name: yup.string().required(),
//     })

//     return(
//         <Formik 
//               initialValues={{name: ''}}
//               onSubmit={(values) => {
//                 db.collection('tasks').add({
//                     name: validateYupSchema.name,
//                     createdAt: new Date(),
//                     completedAt: null,
//                 }).then(result => navigation.navigate('NewBookingScreen'))
//                   .catch(err => console.log(err))
//               }}
//               validationSchema={validationSchema}
//             >
//                 {({
//                     values, 
//                     handleChange, 
//                     errors,
//                     handleSubmit}) => {
//                     <View>
//                         <TextInput
//                         onChangeText={handleChange('name')}
//                         placeholder={'Describe Task'}
//                         value={values.name}
//                         autoFocus={true} />
//                         { errors['name'] ? <Text>{errors['name']}</Text> : null }
//                         <Button title={'Create'} onPress ={()=> handleSubmit()} />
//                     </View>
//                 }

//                 }
//             </Formik>
        
//     )
// }
// export default TaskForm