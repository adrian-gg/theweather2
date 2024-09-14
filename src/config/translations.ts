export type LanguageType = keyof typeof TRANSLATIONS;

interface LanguageTranslationsType {
  [key: string]: string | string[];
}

type TranslationsType = {
  [key in LanguageType]: LanguageTranslationsType;
};

// To avoid overlapping key names, properties that are of type "Object"
// will be preceded by “arr_”.
const TRANSLATIONS = {
  en: {
    theme: 'Theme',
    wind: 'Wind',
    pressure: 'Pressure',
    humidity: 'Humidity',
    visibility: 'Visibility',
    temp_min: 'Min. temperature',
    temp_max: 'Max. temperature',
    feels_like: 'Feels like',
    clouds: 'Clouds',
    rain: 'Rain',
    snow: 'Snow',
    forecast: 'Forecast',
    cities: 'Cities',
    contact: 'Contact',
    settings: 'Settings',
    temperature_unit: 'Units',
    animation_texts: 'Animation texts',
    name: 'Name',
    email: 'Email',
    birthdate: 'Date of birth',
    city: 'City',
    phone: 'Telephone',
    send: 'Send',
    update_data: 'Update data',
    error_text: 'It must contain only letters and spaces.',
    error_email: 'Please enter a valid email address.',
    error_date: 'Please enter a valid date.',
    error_tel: 'The phone format should be 123456789.',
    error_not_found: 'Data not found',
    arr_days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    arr_months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  es: {
    theme: 'Tema',
    wind: 'Viento',
    pressure: 'Presión',
    humidity: 'Humedad',
    visibility: 'Visibilidad',
    temp_min: 'Temperatura mínima',
    temp_max: 'Temperatura máxima',
    feels_like: 'Se siente como',
    clouds: 'Nubes',
    rain: 'Lluvia',
    snow: 'Nieve',
    forecast: 'Pronóstico',
    cities: 'Ciudades',
    contact: 'Contacto',
    settings: 'Ajustes',
    temperature_unit: 'Unidades',
    animation_texts: 'Textos animados',
    name: 'Nombre',
    email: 'Correo electrónico',
    birthdate: 'Fecha de nacimiento',
    city: 'Ciudad',
    phone: 'Teléfono',
    send: 'Enviar',
    update_data: 'Actualizar datos',
    error_text: 'Solo debe contener letras y espacios.',
    error_email: 'Por favor, introduce un correo electrónico válido.',
    error_date: 'Por favor, introduce una fecha válida.',
    error_tel: 'El formato del teléfono debe ser 123456789.',
    error_not_found: 'Datos no encontrados',
    arr_days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    arr_months: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Oct',
      'Nov',
      'Dic',
    ],
  },
};

// Avoiding circular references
const typedTranslations: TranslationsType = TRANSLATIONS;

export default typedTranslations;
