import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }

  dictionary: {id: string, EN: string}[] = [
    {
      id: 'Профіль',
      EN: 'Profile'
    },
    {
      id: 'Запрошення',
      EN: 'Invite'
    },
    {
      id: 'Виставки',
      EN: 'Exhibitions'
    },
    {
      id: 'Вийти',
      EN: 'Logout'
    },
    {
      id: 'Введіть електронну пошту та/або мобільний телефон',
      EN: 'Enter your email and/or mobile phone'
    },
    {
      id: 'Введіть електронну адресу (якщо ви реєструвалися раніше - введіть електронну адресу яку ви вказували при реєстрації)',
      EN: 'Enter your email address (if you have previously registered - enter the email address you provided when registering)'
    },
    {
      id: 'Будь ласка введіть Вашу дійсну електронну адресу',
      EN: 'Please enter your valid email address'
    },
    {
      id: 'Введіть свій номер мобільного телефона (якщо ви реєструвалися раніше - введіть номер який ви вказували при реєстрації)',
      EN: 'Enter your mobile number (if you have previously registered - enter the number you provided when registering)'
    },
    {
      id: 'Будь ласка введіть мобільний телефон у вказаному форматі',
      EN: 'Please enter your mobile phone in the specified format (Ukrainian operators only)'
    },
    {
      id: 'Введіть пароль, якщо Ви встановили пароль при реєстрації',
      EN: 'Enter the password if you have set a password at registration'
    },
    {
      id: 'невірний пароль',
      EN: 'incorrect password'
    },
    {
      id: 'Отримати запрошення',
      EN: 'Receive invitations'
    },
    {
      id: 'Електронна пошта',
      EN: 'Email'
    },
    {
      id: 'Пароль',
      EN: 'Password'
    },
    {
      id: 'Введіть електронну пошту або телефон',
      EN: 'You need to fill in either your phone or email'
    },
    {
      id: 'Представтесь, будь ласка',
      EN: 'Introduce yourself'
    },
    {
      id: 'Вітаємо!',
      EN: 'Welcome!'
    },
    {
      id: 'Будь ласка введіть прізвище',
      EN: 'Please enter a last name'
    },
    {
      id: "Будь ласка введіть ім'я",
      EN: 'Please enter a name'
    },
    {
      id: 'Заповніть Ваші контактні дані',
      EN: 'Fill in your contact information'
    },
    {
      id: 'Відредагуйте Ваші контактні дані, якщо вони змінилися',
      EN: 'Edit your contact information if they have changed'
    },
    {
      id: 'Будь ласка введіть країну',
      EN: 'Please enter a country'
    },
    {
      id: 'Будь ласка введіть область',
      EN: 'Please enter a region'
    },
    {
      id: 'Будь ласка введіть місто',
      EN: 'Please enter a city'
    },
    {
      id: 'Ваша робота',
      EN: 'Place of work'
    },
    {
      id: 'Відредагуйте Ваші дані про роботу, якщо вони змінилися',
      EN: 'Edit your place of work if it has changed'
    },
    {
      id: 'Оберіть виставки, яки Вас ще можуть зацікавити',
      EN: 'Choose exhibitions that may be of interest to you'
    },
    {
      id: "Не всі обов'язкові поля заповнені або заповнені невірно",
      EN: 'Not all required fields are filled or filled in incorrectly'
    },
    {
      id: '- Потрібно заповнити або телефон або email',
      EN: '- You need to fill in either your phone or email'
    },
    {
      id: 'Потрібно обрати принаймні одну виставку',
      EN: 'At least one exhibition must be selected'
    },
    {
      id: 'Прізвище',
      EN: 'Last name'
    },
    {
      id: "Ім'я",
      EN: 'First name'
    },
    {
      id: 'По-батькові',
      EN: 'Surname'
    },
    {
      id: 'Країна',
      EN: 'Country'
    },
    {
      id: 'Пошук',
      EN: 'Search'
    },
    {
      id: 'Область',
      EN: 'Region'
    },
    {
      id: 'Місто',
      EN: 'City'
    },
    {
      id: 'Особиста електронна пошта *',
      EN: 'Personal email *'
    },
    {
      id: 'моб.тел. 380ххххххххх *',
      EN: 'mobile number 380xxxxxxxxxx *'
    },
    {
      id: 'Місце роботи',
      EN: 'Company name'
    },
    {
      id: 'Посада',
      EN: 'Position'
    },
    {
      id: 'Сфера діяльності',
      EN: 'Professional activity'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
    {
      id: 'xxxxxxxxxxx',
      EN: 'xxxxxxxxxxx'
    },
  ]  

}
