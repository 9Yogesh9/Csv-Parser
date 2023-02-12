# Project CSV Parser <a href="https://csv-parser-v53b.onrender.com/" target="_blank"> Live App</a>

<p>This app will help you <strong>Parse and Display the data for CSV files</strong>. <a href="https://csv-parser-v53b.onrender.com/" target="_blank"> Check it out !</a><p>
<p>Following are the features of this app:</p>

<ol>
<li>Home page.
  <ul>
    <li>Let you upload CSV file.</li>  
    <li>Shows a list of files uploaded in database.</li>
    <li>While uploading the file following checks are implemented:
      <ol>
        <li>Only CSV files are allowed to be uploaded.</li>
        <li>File with the name same as already uploaded file will be rejected.</li>  
        <li>File above 10 MB will be rejected.</li>  
      </ol>
    </li>
  </ul>
 </li>
<li>File Details page:
  <ul>
    <li>Display the file data in the table format.</li>
    <li>Table headers will be modified dynamically as the uploaded CSV's first row will be treated as coloumn headers.</li>  
    <li>Maximum 100 records are allowed to be displayed on the page.</li>
    <li>If records are above 100 then you can browse the data by navigation buttons provided at the bottom.</li>
    <li>If records are below 100 then pagination feature will be disabled.</li>
  </ul>
 </li>
<li><strong>Special features:</strong>
  <ol type="A">
    <li><strong>Pagination :</strong> 100 Records/Page.</li>
      <ul>
        <li>Navigation buttons - Start Page, Prev Page, Next Page, End Page.</li>
      </ul>
    <li><strong>Sorting :</strong> You can sort the whole data just by clicking on any column header.</li>
      <ul>
        <li>Click on Left side of column header - Sorts the column in Ascending order.</li>
        <li>Click on Right side of column header- Sorts the column in Descending order.</li>
      </ul>
    <li><strong>Searching :</strong> You can search a data from <strong>Second column</strong> of file</li>
      <ul>
        <li>Sorting will be enabled for the search results.</li>
        <li>If search records are move than 100 then pagination will be enabled.</li>
        <li>If search is performed for empty value then all records will be visible.</li>
      </ul>
    <li><strong>Delete :</strong> You can delete the opened file to free up the storage.</li>
       <ul>
        <li>In backend once the data is parsed the file will be deleted from the server and data will be stored in json format inside database.</li>
        <li>To delete the stored file data from the database this feature is provided.</li>
      </ul>
    <li><strong>Page Number :</strong> You will get to know the current page number at the right bottom of the screen.</li>
       <ul>
        <li>The value for page will be changed dynamically as per the size of database.</li>
        <li>Once you run the search query the page number will start pointing to the search results data.</li>
      </ul>
  </ol>
 </li>
</ol>

<h2><a href="https://csv-parser-v53b.onrender.com/" target="_blank">Explore in real !</a></h2> This will open the live hosted application

<h2>Prerequisites:</h2>
  <ol>
    <li>Node should be installed on your Device</li>
    <li>Mongo DB should be installed</li>
  </ol>
 
<h2>How to setup ?</h2>
  <ol>
    <li>Download the zip file for this project from the repository or <a href="https://github.com/9Yogesh9/Csv-Parser/archive/refs/heads/main.zip">Click here to download !</a></li>
    <li>Extract the file open in VS Code.</li>
    <li>Run <code>npm i</code> this will install all dependencies.</li>
    <li>Run <code>nodemon index.js</code> (if this command doesn't work, then nodemon is not installed globally in your system, please run <code>npm i nodemon</code> before running this command.)</li>
    <li>The app will be live on port 8000, you can access it using url <code>http://localhost:8000</code> in your browser.</li>
    <p><strong>Note : To run in local environment and link to your local mongo data base just uncomment the line 8 and comment line 3 and 9 in <code>mongoose.js</code> as the project is linked to cloud data base.</strong></p>
  </ol>
  
<h2>Screenshots:</h2>
<h3>Home Page</h3>
<img src="https://raw.githubusercontent.com/9Yogesh9/Csv-Parser/main/assets/screenshots/home.png">

<h3>File Details Page</h3>
<img src="https://raw.githubusercontent.com/9Yogesh9/Csv-Parser/main/assets/screenshots/details.png">

