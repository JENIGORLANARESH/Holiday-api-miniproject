import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://holidays.abstractapi.com/v1/";

const yourBearerToken = "";//your key

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  (req, res) => {
     res.render("index.ejs",{ content: "Find your Holiday..."});
});

app.post("/submit", async (req, res) => {
  try{
    const result = await axios.get(API_URL+"?api_key="+yourBearerToken+"&country="+ req.body["country"] +"&year="+ req.body["year"]+ "&month="+ req.body["month"]+ "&day="+ req.body["day"]);

    res.render("index.ejs", {
       content: JSON.parse(JSON.stringify(result.data[0].name)),
       week_day: JSON.parse(JSON.stringify(result.data[0].week_day)),
       date_day: JSON.parse(JSON.stringify(result.data[0].date_day)),
       date_month: JSON.parse(JSON.stringify(result.data[0].date_month)),
       date_year: JSON.parse(JSON.stringify(result.data[0].date_year)),
      
    });
    // let data = result.data;
    // console.log(data);
  }
  catch (error) {
    res.render("index.ejs",{ error: error.message,
    content: "Data not found about this country on this date.."
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server is running is running ar port ${port}`);
});
