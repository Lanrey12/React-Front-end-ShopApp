import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { verifyEmail } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { alertService } from '../alert/alertService'

function VerifyEmail({ history }) {
    const dispatch = useDispatch()
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);
    
    const verify = () => {
      
        const { token } = queryString.parse(window.location.search);
       // remove token from url to prevent http referer leakage
       history.replace(window.location.pathname);

       dispatch(verifyEmail(token))
           .then(() => {
               alertService.success('Verification successful, you can now login', { keepAfterRouteChange: true });
               history.push('/account/login');
           })
           .catch(() => {
               setEmailStatus(EmailStatus.Failed);
               alert('Invalid Email')
           });
    }

    useEffect(verify, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>;
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to="forgot-password">forgot password</Link> page.</div>;
                default:
                    return emailStatus
        }
    }

    return (
        <div>
            <h3 className="card-header">Verify Email</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { VerifyEmail }; 