import { Form, Formik } from 'formik';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import CommonButton from '../common/CommonButton';
import { validationSchema } from '../../schemas/validationSchema';
import { provinces } from '../constants/data';
import { useLocalStorage } from '../../lib/utils';
import { v4 as uuidv4 } from 'uuid';

export default function UserForm({ countries }) {
    // Initialize form data from localStorage using the custom hook
    const [formData, setFormData] = useLocalStorage('formData', []);

    const initialValues = {
        name: '',
        email: '',
        phnumber: '',
        dob: '',
        city: '',
        district: '',
        province: 'Province 1',
        country: 'Nepal',
        profilePicture: ''
    };

    const handleSubmit = (values, { resetForm }) => {
        // Generate a unique ID for the new entry
        const id = uuidv4();

        // Handle file as a Base64 string for storage
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedValues = {
                id, // Add ID here
                ...values,
                profilePicture: reader.result
            };

            setFormData([...formData, updatedValues]);
            alert('Form submitted and saved to localStorage!');
            resetForm();
        };

        if (values.profilePicture) {
            reader.readAsDataURL(values.profilePicture);
        } else {
            const updatedValues = { id, ...values, profilePicture: '' };
            setFormData([...formData, updatedValues]);
            alert('Form submitted and saved to localStorage!');
            resetForm();
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, isValid, dirty, values, resetForm }) => (
                <Form>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <InputField label='Name' name='name' />
                        <InputField label='Email' name='email' type="email" />
                        <InputField label='Phone Number' name='phnumber' />
                        <InputField label='Date of Birth (DOB)' name='dob' type="date" placeholder='YYYY-MM-DD' />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <InputField label='City' name='city' />
                        <InputField label='District' name='district' />
                        <SelectField label='Province' name='province' data={provinces} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <SelectField label='Country' name='country' data={countries} />
                        <InputField
                            type="file"
                            accept="image/png"
                            label='Profile Picture'
                            name='profilePicture'
                            onChange={(e) => setFieldValue('profilePicture', e.currentTarget.files[0])}
                        />
                        {values.profilePicture && values.profilePicture.type === 'image/png' && (
                            <img src={URL.createObjectURL(values.profilePicture)} alt="Profile" width="100" />
                        )}
                    </div>
                    <div className="mt-4">
                        <CommonButton
                            label='Submit'
                            isValid={isValid}
                            dirty={dirty}
                            disabled={!isValid || !dirty} // Ensure submit button is properly controlled
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}
