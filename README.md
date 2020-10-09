# Nearby shops Front-End

### ** steps to run the project :
*   in CMD go to the project folder and run the command " `npm start` " to start the application.

### I) Features :
#### 1) SignUpView : 
*   <Strong>Sign-up : </Strong>(no need for authentication) allows the creation of new user account using email, password, and default location.
#### 2) LoginView : 
* <Strong>Login : </Strong>(no need for authentication) allows user to authenticate.
#### 3) NearbyShopView : 
* <Strong>Display nearby shops using default user location: </Strong>(needs authentication) displays nearby shops sorted by distance to the default location of the authenticated user that he gives when he create his account the first time.
  (Disliked shop won’t be displayed within “Nearby Shops” list during the next 2 hours, favorites shops won't be returned)  
* <Strong>Display nearby shops using custom location : </Strong>(needs authentication) returns nearby shops to a custom location selected by the authenticated user.
  (Disliked shop won’t be displayed within “Nearby Shops” list during the next 2 hours, favorites shops won't be displayed) 
* <Strong>give reaction about a shop : </Strong>(needs authentication) allows to give negative(dislike) or positive(like) reaction about a shop.
#### 4) FavoriteShopView : 
* <Strong>display favorites shops : </Strong>(needs authentication) display favorites shops that received positive reaction(like) from the authenticated user.
* <Strong>remove shop from favorites shops : </Strong>(needs authentication) remove a shop from favorites shops of the authenticated user

### II) Used technologies :
####  1) development : 
* <Strong>React</Strong>
* <Strong>React Bootstrap</Strong> 
* <Strong>HTML, CSS</Strong>


####  2) tests :
* <Strong>Jest : </Strong> JavaScript testing framework that is used to write unit tests of "React js" components.
* <Strong>Enzyme : </Strong>JavaScript testing utility for React that makes it easy to write assertions and manipulate the rendered elements of React components.

### III) Project structure :

* <Strong> src > components  :</Strong> contains differents components that are used to create differents user interfaces views.
* <Strong> src > views :</Strong> contains views that represents final user Interfaces.
* <Strong> src > services :</Strong> contains service that handle data exchange between the API and the Front-End of the application 
* <Strong> src > utils :</Strong> contains utilities such as constants and functions to prepare httpRequests and to handle httpResponses.
* <Strong> src > assets :</Strong> contains the images and the icons used in the application 



