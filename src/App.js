import './App.css';
import EnrollmentForm from './components/Formik/EnrollmentForm';
import FormikContainer from './components/Formik/FormikContainer';
import LoginForm from './components/Formik/LoginForm';
import RegisterForm from './components/Formik/RegisterForm';
import YoutubeForm from './components/YoutubeForm';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <EnrollmentForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
