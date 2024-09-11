import mock from './mock';
import './blog/blogData';
//import './contacts/ContactsData';
//import './chat/Chatdata';
import './prayers/PrayersData';
import './gallery/GalleryData';
//import './ticket/TicketData';
//import './eCommerce/ProductsData';
//import './email/EmailData';
import './feed/PostData';
//import './userprofile/UsersData';

mock.onAny().passThrough();
