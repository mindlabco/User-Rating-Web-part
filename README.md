# User Rating Web part
# Description
It is a custom web part developed in SharePoint Framework (SPFx). We have used bootstrap module. We used this web part to get user specfic ratings, Average Rating based on the various Tiles and different comments on the tiles from multiple lists like *Site Branding, LPTiles, LPComments*. From various lists we get the values and display it in the web part.

This web part gets the value based on the id passed in the URL. Based on the id's value, we retrieve the average rating, comments, rating of the perticular loged in user etc. from the list. LPTiles list is a custom list consist of various columns including two look up columns i.e. *Type List, Site Branding, LPTiles*. LPComments is another custom list consist of various columns including one look up column i.e. *Title* of LPTiles.

# How to use
To use the web part follow the below steps:-
1) Clone or Download the web part solution
2) Install all the list STPs (which is available inside the repository) in your site (Keep the name same as it is, do not change the name of the list)
3) Go to *LPTiles* list and create new two lookup columns named *Tile Type* and *Category*. Configurations are shown in the screen shot for both the columns
4) Go to *LPComments* list and create a new lookup column named *Tile*. Configuration are shown in the screen shot for this column. 
5) Navigate to the cloned repository folder
6) Open your system's terminal on that folder
7) In your terminal, Navigate to the web part folder inside the cloned repository
8) Now run *npm install* command to install all the npm packages

# Column Configuration

1) Below is the screen shot for *Tile Type* column

![Image of Yaktocat](https://github.com/mindlabco/User-Rating-Web-part/blob/master/Tile-Type-Config.png)

2) Below is the screen shot for *Category* column

![Image of Yaktocat](https://github.com/mindlabco/User-Rating-Web-part/blob/master/Category-config.png)

3) Below is the screen shot for *Tile* column

![Image of Yaktocat](https://github.com/mindlabco/User-Rating-Web-part/blob/master/Tile-Title-Config.png)


# Output

Below Screenshot is the output of this web part

![Image of Yaktocat](https://github.com/mindlabco/User-Rating-Web-part/blob/master/User-Rating.PNG)
