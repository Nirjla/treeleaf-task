import * as Yup from "yup";

const today = new Date();

const alphaOnlyRegex = /^[A-Za-z\s]+$/;

export const validationSchema = Yup.object().shape({
      name: Yup.string()
            .required('Required')
            .matches(alphaOnlyRegex, 'Name must only contain letters and spaces'),

      email: Yup.string()
            .email('Invalid email address')
            .required('Required'),

      phnumber: Yup.string()
            .required('Required').max(10),

      dob: Yup.date()
            .required('Required')
            .max(today, 'Future date not allowed'),

      city: Yup.string()
            .required('Required')
            .matches(alphaOnlyRegex, 'City must only contain letters and spaces'),

      district: Yup.string()
            .required('Required')
            .matches(alphaOnlyRegex, 'District must only contain letters and spaces'),

      province: Yup.string()
            .required('Required'),

      country: Yup.string()
            .required('Required'),
      profilePicture: Yup.mixed()
            .required('Required')

});
