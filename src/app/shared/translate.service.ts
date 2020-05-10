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
      id: 'Зареєструватися/Отримати запрошення',
      EN: 'Register/Receive Invitation'
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
      id: 'Зареєструйтесь будь ласка',
      EN: 'Please register'
    },
    {
      id: 'Оберіть виставку',
      EN: 'Choose an exhibition' 
    },
    {
      id: 'ви вже реєструвалися',
      EN: 'you have already registered'
    },
    {
      id: 'ЗАПРОШЕННЯ',
      EN: 'INVITATION'
    },
    {
      id: 'Шановний(а)',
      EN: 'Dear'
    },
    {
      id: 'Ви отримали персональне запрошення на виставку',
      EN: 'You have received a personal invitation to the exhibition'
    },
    {
      id: 'яке також було надіслано на Вашу електронну пошту',
      EN: 'which was also sent to your email'
    },
    {
      id: 'Покажіть цей код на вході',
      EN: 'Show this code at the entrance'
    },
    {
      id: 'Збережіть це запрошення або просто покажіть на екрані вашого смартфону',
      EN: 'Save this invitation or just show it on your smartphone'
    },
    {
      id: 'зберегти',
      EN: 'save'
    },
    {
      id: 'надіслати',
      EN: 'send'
    },
    {
      id: 'інше запрошення',
      EN: 'another invitation'
    },
    {
      id: 'Оберіть виставку та отримайте запрошення',
      EN: 'Choose an exhibition and get an invitation'
    },
    {
      id: 'Детальніше',
      EN: 'Read more'
    },
    {
      id: 'Зареєструйтесь будь ласка, або, якщо ви вже реєструвалися, натисніть Сancel та вкажить інший телефон чи e-mail',
      EN: 'Please register, or, if you have already registered, click Сancel and enter another phone or e-mail'
    },
    {
      id: 'Невірний пароль',
      EN: 'incorrect password'
    },
    {
      id: 'Погоджуюся з отриманням інформації про заходи серії "Галицькі Експозиції"',
      EN: 'I agree to receive information about events of the series "Galician Expositions"'
    },
    {
      id: 'Рекомендуємо встановити пароль для захисту персональних даних',
      EN: 'We recommend that you set a password to protect your personal information'
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
