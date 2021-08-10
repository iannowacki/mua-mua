// import React from 'react';
// import { TextInput, View, Button, Text } from 'react-native';
// import { Formik, validateYupSchema } from 'formik';
// import db from '../db/firestore';
// import * as yup from 'yup';
// import { useNavigation } from '@react-navigation/native';

// const FormProps = {
//     name: String
// }

// const CreateTask = () => {
//     const navigation = useNavigation()
//     const validationSchema = yup.object().shape({
//         name: yup.string().required(),
//     })

//     return (
//         <View>
//             <Formik 
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
//         </View>
//     )
// }

// export default CreateTask