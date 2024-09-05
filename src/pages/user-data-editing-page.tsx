import forms from '../app/inputs/forms';
import localisations from '../app/constants/localizations/localizations';
import Form from "../components/form";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { categoryFilteringRules } from '../app/inputs/filteringRules';
import { IUserCard } from '../models/users';

const EditPersonalDataPage = () => {

    const location = useLocation()

    const userID = location.pathname.split("/").at(-1)

    const message = localisations.pages.editPersonalData.confirmMsg

    function sendData() {
        console.log("Данные отправлены")
    }

    const userList: IUserCard[] = [
        {
          login: "26594",
          password: "123456",
          fullName: "Иванов Иван Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26595",
          password: "123456",
          fullName: "Иванов Иван Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26596",
          password: "123456",
          fullName: "Иванов Иван Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26597",
          password: "123456",
          fullName: "Иванов Иван Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26598",
          password: "123456",
          fullName: "Иванов Иван Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
          {
            login: "26599",
            password: "123456",
            fullName: "Иванов Иван Иванович",
            position: "научный сотрудник",
            department: "НЦ Переработки ресурсов",
            equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
            isVerified: false
          },
      ]

      const userData = userList.find(el => el.login === userID)
      if(!userData) return null

    return <Form defaultTextInputs={forms.editPersonalData}
                 defaultValues={userData}
                 confirmMessage={message}
                 filteringRules={categoryFilteringRules}
                 sendData={sendData}
    />;
};

export default EditPersonalDataPage;