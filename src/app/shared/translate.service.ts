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
      id: 'Введіть пароль, який Ви встановили пароль при реєстрації',
      EN: 'Enter the password you set when registering'
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
      EN: 'Sign up / Receive Invitation'
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
      id: 'Прізвище',
      EN: 'Last name'
    },
    {
      id: 'для встановлення пароля необхідна електронна пошта',
      EN: 'email is required to set a password'
    },
    {
      id: 'Невірний пароль. Якщо Ви забули пароль, натисніть "ОК". Якщо хочете ввести пароль знову натисніть "Сancel"',
      EN: 'Invalid password. If you have forgotten your password, click "OK". If you want to enter the password again, click "Cancel"'
    },
    {
      id: 'Стать',
      EN: 'Gender'
    }, 
    {
      id: 'чоловіча',
      EN: 'male'
    },
    {
      id: 'жіноча',
      EN: 'female'
    },
    {
      id: 'Редагувати пароль',
      EN: 'Edit password'
    },
    {
      id: 'Старий пароль',
      EN: 'First password'
    },
    {
      id: 'Введіть старий пароль',
      EN: 'Enter the first password'
    },
    {
      id: 'Новий пароль',
      EN: 'New password'
    },
    {
      id: 'Пароль має містити хоча б одну одну цифру та одну літеру та бути довшим за 6 символів',
      EN: 'The password must contain at least one digit and one letter and be longer than 6 characters'
    },
    {
      id: 'Повторіть новий пароль',
      EN: 'Confirm the new password'
    },
    {
      id: 'Пароль не співпадає',
      EN: 'Password does not match'
    },
    {
      id: 'Введіть пароль',
      EN: 'Enter the password'
    },
    {
      id: 'Зареєструватися',
      EN: 'Sign up'
    },
    {
      id: 'Внести зміни',
      EN: 'Make changes'
    },
    {
      id: 'Ваші дані успішно змінені',
      EN: 'Your data has been changed successfully'
    },
    {
      id: 'БудЕКСПО',
      EN: 'BudEXPO'
    },
    {
      id: 'Деревообробка',
      EN: 'Woodprocessing'
    },
    {
      id: 'Дентал-УКРАЇНА',
      EN: 'Dental-UKRAINE'
    },
    {
      id: 'ГалМЕД',
      EN: 'GalMED'
    },
    {
      id: 'ЄвроАГРО',
      EN: 'EuroAGRO'
    },
    {
      id: 'ТурЕКСПО',
      EN: 'TourEXPO'
    },
    {
      id: 'Вікна-двері-дах',
      EN: 'Windows-Doors-Roof'
    },
    {
      id: 'ЕлітЕКСПО',
      EN: 'ElitEXPO'
    },
    {
      id: 'Опалення',
      EN: 'Heating'
    },
    {
      id: 'Готельний та рестор. бізнес',
      EN: 'Hotel and restaurant business'
    },
    {
      id: 'Континент розваг',
      EN: 'Continent of entertainment'
    },
    {
      id: 'Дитячий світ',
      EN: 'Children\'s World'
    },
    {
      id: 'Альтернативна енергетика',
      EN: 'Alternative energy'
    },
    {
      id: 'Дентал-Експо',
      EN: 'Dental-Expo'
    },
    {
      id: 'Байк ЕКСПО',
      EN: 'Bike EXPO'
    },
    {
      id: 'Вибачте, помилка запиту до сервера',
      EN: 'Sorry, server request error'
    },
    {
      id: 'вул. Винниченка, 30,',
      EN: 'Vinnychenko, 30 str.,'
    },
    {
      id: 'м. Львів, 79008, Україна',
      EN: 'Lviv, 79008, Ukraine'
    },
    {
      id: 'Тел.',
      EN: 'Tel.'
    },
    {
      id: 'Факс',
      EN: 'Fax'
    },
    {
      id: 'Слідкуй за нами:',
      EN: 'Follow us:'
    }, 
    {
      id: 'Ви успішно змінили пароль. Увійдіть використовуючи новий пароль',
      EN: 'You have successfully changed your password. Log in using a new password'
    },
    {
      id: 'Вхід',
      EN: 'Login'
    },
    {
      id: 'Щось пішло не так. Спробуйте ще раз пізніше',
      EN: 'Something went wrong. Please try again later'
    },
    {
      id: 'Всі необхідні зміни вже були зроблені',
      EN: 'All the necessary changes have already been made'
    },
    {
      id: 'На вашу пошту буде надісланий електронний лист з підтвердженням пароля, перевірте пошту та підтвердіть пароль',
      EN: 'You will receive a password confirmation email, check your email, and confirm your password'
    },
    {
      id: 'На вашу пошту буде надісланий електронний лист з підтвердженням, перевірте пошту та підтвердіть скидання пароля',
      EN: 'A confirmation email will be sent to your email, check your email and confirm your password reset'
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














