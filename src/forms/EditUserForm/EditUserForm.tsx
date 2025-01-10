import './edit-user-form.scss';
import FormProvider from '../../context/FormProvider';
import { useLayout } from '../../context/LayoutProvider';
import FormField from '../../components/Form/FormField';
import FormSubmit from '../../components/Form/FormSubmit';
import FormReset from '../../components/Form/FormReset';
import { useCallback } from 'react';
import { EditUserRequest, editUserSchema } from '../../services/requestValidators/editUser';
import { useParams } from 'react-router-dom';
import useEditProfile from '../../services/userRequests/useEditProfile';

export default function EditUserForm() {
    const { createSnack } = useLayout();
    const { id } = useParams();
    const editProfile = id ? useEditProfile(id) : () => "Error editing profile: User id not found";

    const map = useCallback((editUserForm: EditUserRequest) => ({
        name: {
            first: editUserForm.nameFirst,
            middle: editUserForm.nameMiddle,
            last: editUserForm.nameLast
        }
    }), []);

    return (
        <FormProvider schema={editUserSchema} map={map} handleSubmit={async (data) => {
            const editUserError = await editProfile(data);
            if (editUserError) createSnack({ id: Date.now(), time: 10, right: 100, top: 100, style: { backgroundColor: "#800000", color: "#F1E5D1", fontSize: "1.5rem" }, children: editUserError });
            return true;
        }}>
            <FormReset />
            <FormField name="nameFirst" placeholder="First Name" required />
            <FormField name="nameMiddle" placeholder="Middle Name" />
            <FormField name="nameLast" placeholder="Last Name" required />
            <FormSubmit />
        </FormProvider>
    )
}
