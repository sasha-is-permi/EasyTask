/* Регистрация */
import React, { useState } from 'react';
import CustomBlock from './CustomBlock';
import styled from 'styled-components';
import CustomInput from '../../../common/components/newComponent/Inputs/CustomInput';
import Checkbox from '../../../common/components/CheckboxItem/Checkbox';
import Button from '../../../common/components/newComponent/Buttons/Button';
import { validatePassword } from '../../../utils/validPatterns';
import { fetchData } from '../../../utils/fetchData';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { cookieMaster } from '../../../utils/CookieMaster';
import { useSelector,useDispatch } from 'react-redux';
import { State } from '../../../rootReducer';
import { urlApp } from '../../../App';
import palette from '../../../common/components/palette'; //******************************************** */
import { CreateNotif } from '../../../utils/createNotification';
import { fetchToken } from '../actions';
import Input from '../../../common/components/Inputs/Input';



const CounterStyle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 24px;
  text-align:center;
`;
const CheckboxBlock = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #707070;
  display: flex;
  margin: 28px 0;
  span {
    margin-left: 8px;
  }
`;
const WrapperBlockInputs = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  position: relative;
  margin-bottom: 24px;
  input {
    height: 40px;
    border: none;
    border-radius: 0;
    &:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
    &:last-child {
      border-radius: 0 0 6px 6px;
    }
    &:first-child {
      border-radius: 6px 6px 0 0;
    }
  }
`;

const TextStyle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #707070;
  margin-bottom: 24px;
`;

//************************************** */
const TextStyle2 = styled(TextStyle)`
  color: #00c;
`;
//************************************* */

const TextStyle3 = styled(TextStyle)`
font-weight: bold;
`
/************************************* */

const Divider = styled.div`
width:5px;
height:5px;
`


const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    align-items: center;
    padding: 8px 0;
    width: 132px;
  }
`;

// Документы - политика конфеденциальности и оферта
const Document = styled.a`
href= ${({ href }) => (href)};
title= ${({ href }) => (href)};
`;

const P = styled.p`
margin-top:20px;
margin-left:5px;
text-align:center;
`


const Register = () => {

  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [confirmation, setСonfirmation] = useState(false);
  const [dataUser, setDataUser] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
  });
  let history = useHistory();
  // let { current_user } = useSelector((state: State) => state.commonInfo);
  let validationEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /*
  useEffect(() => {
    let token = cookieMaster.getCookie('access_token');
    let company_id = localStorage.getItem('company_id') || '';
    if (token && company_id === '') {
      fetchData
        .get(`/api/v1/users/${current_user}/companies`)
        .then((data) => {
          if (data) {
            company_id = data.sort((a, b) => a - b)[0] || 0;
          } else {
            company_id = '0';
          }
          localStorage.setItem('company_id', company_id);
        })
        .then(() => {
          if (token && +company_id === 0) {
            setCounter(3);
          } else if (token && +company_id) {
            history.push('/');
          }
        });
    } else if (token && +company_id === 0) {
      setCounter(3);
    } else if (token && +company_id) {
      history.push('/');
    } else if (!token) {
      setCounter(1);
    }
  }, []);


  */

  const [visible,setVisible] = useState<boolean>(false)


  return (
   
    <CustomBlock
        style={{textAlign:'center'}}
        title={
        counter === 0
          ? 'Спасибо!'
          : counter === 1
          ? 'Быстрая регистрация'
          : counter === 2
          ? 'Добро пожаловать'
          : ''
      }
    >
  


 {counter === 2 && ( 

        <TextStyle3>
          <p>Если вы вводили email, то мы отправили письмо с паролем для авторизации на ваш адрес электронной почты.
             Введите, пожалуйста, этот адрес и пароль из полученного вами письма в поле "Пароль".
          </p>
         <Divider/>
          <p>Если в течение десяти минут электронное письмо не было получено, проверьте правильность указанного адреса 
          или обратитесь в чат технической поддержки. Он находится с левой нижней стороны экрана.
          Наши специалисты помогут оперативно решить ваш вопрос.</p>
          <Divider/>    
        </TextStyle3>

 )}

      
      {counter <= 2 && counter !== 0 && (
        <CounterStyle>Шаг {counter}/2</CounterStyle>
      )}

      {counter === 1 && (
        
        <>
          <CustomInput
            placeholder="Email (новый)"
            value={dataUser.email}
            inputChangeHandler={(value) => {
              setDataUser((prev) => {
                return {
                  ...prev,
                  email: value,
                };
              });
            }}
          />
    
   <CheckboxBlock>
            <Checkbox
              checked={confirmation}
              onChange={() => {
                setСonfirmation(!confirmation);
              }}
            />
            <span style={{fontSize:"14px"}}>Я согласен с
<Document target="_blank" href={'https://easy-task.ru/policy'} title={' условиями и политикой конфиденциальности '} >  условиями и политикой конфиденциальности  </Document>   
 и
 <Document target="_blank" href={'https://easy-task.ru/oferta'} title={'Договор оферты'} > договором оферты </Document>
</span>
          </CheckboxBlock>


        </>
        
      )}
      {counter === 2 && (
        <WrapperBlockInputs>
      
      {/* ********************************************************** */}

      <form autoComplete="off">             
          <CustomInput
            placeholder="Фамилия"
            value={dataUser.surname}
            inputChangeHandler={(value) => {
              setDataUser((prev) => {
                return {
                  ...prev,
                  surname: value,
                };
              });
            }}
          />
     </form>   

     
{/* ********************************************************** */}
 <div style={{height:"1px",width:"100%",borderTop:`1px  ${palette.lightGray} solid`}}></div>
{/* ********************************************************** */}  

    {/* Добавлено*/}

    <form autoComplete="off">  

    <CustomInput
       placeholder="Имя"
      value={dataUser.name}
      inputChangeHandler={(value) => {
       setDataUser((prev) => {
          return {
            ...prev,
           name: value,
          };
          });
         }}
      />

      </form>
    
     {/* ********************************************************** */}
     <div style={{height:"1px",width:"100%",borderTop:`1px  ${palette.lightGray} solid`}}></div>
     {/* **********************************************************  
     <div style={{ height: "0px", overflow: "hidden", background: "transparent" }}>
        <input type="password"></input>     
    </div>
     {/* ********************************************************** */}  

      <form autoComplete="off">

        <CustomInput
            placeholder="Email"
            value={dataUser.email}
            inputChangeHandler={(value) => {
              setDataUser((prev) => {
                return {
                  ...prev,
                  email: value,
                };
              });
            }}
          />

      </form>

     {/* ********************************************************** */}
     <div style={{height:"1px",width:"100%",borderTop:`1px  ${palette.lightGray} solid`}}></div>
     {/* **********************************************************  */}


        <form autoComplete="off">   
        <Input
          inputType={visible?"text":"password"}
          placeholder="Пароль"
          withIcon={true}
          value={dataUser.password}
          title="Пароль из письма"
          changeHandler={(value) => {
            setDataUser((prev) => {
              return {
                ...prev,
                password: value,
              };
            });
          }}
            />
        </form>  

           {/* ********************************************************** */}
           <div style={{height:"1px",width:"100%",borderTop:`1px  ${palette.lightGray} solid`}}></div>

    


           {/* ********************************************************** */}
        </WrapperBlockInputs>
      )}
      {counter === 0 && (
        <>
        <TextStyle>
          Если вы вводили email, то мы отправили письмо для подтверждения регистрации на ваш адрес электронной почты. 
          Если в течение десяти минут электронное письмо не получено, проверьте, пожалуйста, правильность указанного адреса.
        </TextStyle>
         <TextStyle2>
         Если на ваш адрес электронной почты не поступило письмо с логином и паролем, пожалуйста, обратитесь в чат 
         технической поддержки. Он находится с левой нижней стороны экрана. Наши специалисты помогут оперативно решить ваш вопрос.
         </TextStyle2>
         </>
      )}
      {counter < 3 ? (
        <>
          <Button
            big
            disabled={
              (counter === 1 &&
                confirmation &&
                validationEmail.test(dataUser.email)) ||
              (counter === 2 &&
                dataUser.name.length >= 1 &&
                dataUser.surname.length >= 1 &&
                dataUser.password.length >= 1) ||
              counter === 0
                ? false
                : true
            }
            title={counter < 3 ? 'Продолжить' : 'Готово'}
            onClick={() => {
              if (counter === 0) {
            //   alert("counter0")
            //    history.push('/login');
              } 
              else if (counter === 1) {

               

                let dataUserSend1={email:""}
                dataUserSend1.email = dataUser.email; // Введенный email


                fetch(urlApp + '/users/registration', {
                  method: 'POST',
                  body: JSON.stringify(dataUserSend1),
                })
                .then(function (response) {
                  return response.json()
                })
                .then(function (data) {
                  if ('data' in data){
                  console.log('data', data)
                  setCounter(counter + 1); 
                  }
                  else if ('error' in data){
                 CreateNotif('Такой email уже существует в базе. Введите, пожалуйста, другой email!', 'warning');
                 setCounter(1);
                  }
                })
                .catch(function (error) {
                  console.log('error', error);
                  CreateNotif('Ошибка при регистрации. Попробуйте заново!', 'error');
                  setCounter(1);
                })   

              }
              else if (counter === 2) {

                let dataUserSend2={email:"",name:"",surname:"",password:"",reg:"1"}
                dataUserSend2.email = dataUser.email; // Введенный email
                dataUserSend2.name = dataUser.name; // Введенное имя
                dataUserSend2.surname = dataUser.surname; // Введенная фамилия
                dataUserSend2.password = dataUser.password; // Введенная фамилия


                fetch(urlApp + '/api/v1/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                  body: JSON.stringify(dataUserSend2),
                })
                .then(function (response) {
                  return response.json()
                })
                .then(function (data) {

                  if ('user_id' in data){

                    console.log('data', data)
                    
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('company_id', data.company_id);
                    localStorage.setItem('user_id', data.user_id);

                    

                    let token = data.access_token;

                    dispatch(fetchToken(dataUserSend2.email, dataUserSend2.password));
                    
                    token = cookieMaster.getCookie('access_token');
                    
                    setTimeout(() => {if (token) {history.push('/') }      }, 500)
                    

                    }
                    else if ('error' in data){
                    CreateNotif('Введен неверный пароль!  ', 'warning');
                    setCounter(2);
                    }
                })
                .catch(function (error) {
                  console.log('error', error);         
                  CreateNotif('Ошибка при регистрации. Попробуйте заново!', 'error');
                  setCounter(2);
                })   

              } else {
                setCounter(0);
              }
            }}
          />
        {counter === 1 && (
            <Button
              big
              design="secondary"
              title="Вперед"
              onClick={() => setCounter(2)}
              style={{ marginTop: '8px', marginBottom: '8px' }}
            />    ) }

          {counter === 2 && (
            <Button
              big
              design="secondary"
              title="Назад"
              onClick={() => setCounter(1)}
              style={{ marginTop: '8px' }}
            />
          )}
        </>
      ) : (
        <WrapperButtons>
        </WrapperButtons>
      )}
    </CustomBlock>
  );
};

export default Register;