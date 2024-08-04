import { Form, Formik } from 'formik';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import CommonButton from '../common/CommonButton';
import { validationSchema } from '../../schemas/validationSchema';
import { provinces } from '../constants/data';
import { useLocalStorage } from '../../lib/utils';

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
        // Handle file as a Base64 string for storage
        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedValues = {
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
            const updatedValues = { ...values, profilePicture: '' };
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
                        <InputField label='name' name='name' />
                        <InputField label='email' name='email' type="email" />
                        <InputField label='Phone Number' name='phnumber' />
                        <InputField label='Date of Birth(DOB)' name='dob' type="date" placeholder='YYYY-MM-DD' />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <InputField label='city' name='city' />
                        <InputField label='district' name='district' />
                        <SelectField label='province' name='province' data={provinces} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <SelectField label='country' name='country' data={countries} />
                        <InputField
                            type="file"
                            accept="image/png"
                            label='profile picture'
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
