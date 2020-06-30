import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getById, update } from "../../../../redux/actions/userActions";
import * as Yup from "yup";
import { withFormik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { alertService } from "../../../alert/alertService";

const AddEdit = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getById(id));
  });

  const { touched, errors, isSubmitting, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit User</h1>
      <div className="form-row">
        <div className="form-group col">
          <label>Title</label>
          <Field
            name="title"
            as="select"
            className={
              "form-control" +
              (errors.title && touched.title ? " is-invalid" : "")
            }
          >
            <option value=""></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </Field>
          <ErrorMessage
            name="title"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group col-5">
          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            className={
              "form-control" +
              (errors.firstName && touched.firstName ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group col-5">
          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            className={
              "form-control" +
              (errors.lastName && touched.lastName ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="invalid-feedback"
          />
        </div>

        <div className="form-group col-6">
          <label>Bio</label>
          <Field
            name="bio"
            type="text"
            className={
              "form-control" + (errors.bio && touched.bio ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="bio"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group col-6">
          <label>Location</label>
          <Field
            name="location"
            type="text"
            className={
              "form-control" +
              (errors.location && touched.location ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="location"
            component="div"
            className="invalid-feedback"
          />
        </div>

        <div className="form-group col-6">
          <label>Website</label>
          <Field
            name="website"
            type="text"
            className={
              "form-control" +
              (errors.website && touched.website ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="website"
            component="div"
            className="invalid-feedback"
          />
        </div>

        <div className="form-group col-6">
          <label>Image</label>
          <Field
            name="imageUrl"
            type="text"
            className={
              "form-control" +
              (errors.imageUrl && touched.imageUrl ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="imageUrl"
            component="div"
            className="invalid-feedback"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-7">
          <label>Email</label>
          <Field
            name="email"
            type="text"
            className={
              "form-control" +
              (errors.email && touched.email ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="email"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group col">
          <label>Role</label>
          <Field
            name="role"
            as="select"
            className={
              "form-control" +
              (errors.role && touched.role ? " is-invalid" : "")
            }
          >
            <option value=""></option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </Field>
          <ErrorMessage
            name="role"
            component="div"
            className="invalid-feedback"
          />
        </div>
      </div>

      <div>
        <h3 className="pt-3">Password remains the same</h3>
        <p>Leave input blank</p>
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            className={
              "form-control" +
              (errors.password && touched.password ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="password"
            component="div"
            className="invalid-feedback"
          />
        </div>

        <div className="form-group col">
          <label>Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            className={
              "form-control" +
              (errors.confirmPassword && touched.confirmPassword
                ? " is-invalid"
                : "")
            }
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="invalid-feedback"
          />
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link to="/admin/add" className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userData: {
    userData: state.user.userData,
  },
});

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    bio: Yup.string(),
    location: Yup.string(),
    website: Yup.string(),
    role: Yup.string().required("Role is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
    // .required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    //.required('Confirm Password is required'),
  }),
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    title: props.userData.userData.title ? props.userData.userData.title : "",
    firstName: props.userData.userData.firstName
      ? props.userData.userData.firstName
      : "",
    lastName: props.userData.userData.lastName
      ? props.userData.userData.lastName
      : "",
    email: props.userData.userData.email ? props.userData.userData.email : "",
    bio: props.userData.userData.bio ? props.userData.userData.bio : "",
    location: props.userData.userData.location
      ? props.userData.userData.location
      : "",
    website: props.userData.userData.website
      ? props.userData.userData.website
      : "",
    role: props.userData.userData.role ? props.userData.userData.role : "",
    imageUrl: props.userData.userData.imageUrl
      ? props.userData.userData.imageUrl
      : "",
    password: props.userData.userData.password
      ? props.userData.userData.password
      : "",
    confirmPassword: props.userData.userData.confirmPassword
      ? props.userData.userData.confirmPassword
      : "",
  }),
  handleSubmit: (values, formikBag) => {
    const id = formikBag.props.match.params.id;
    if (id) {
      formikBag.props
        .dispatch(update(id, values))
        .then((user) => {
          alertService.success("Update successful", {
            keepAfterRouteChange: true,
          });
          formikBag.props.history.push("/admin/users");
        })
        .catch((err) => console.log(err));
      formikBag.setSubmitting(false);
    }
  },
})(AddEdit);

const AddEditConnect = connect(mapStateToProps)(formikEnhancer);

export default AddEditConnect;
