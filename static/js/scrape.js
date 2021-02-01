const cheerio = require("cheerio");
const request = require("request-promise");



async function getChefInfo(uname, qCode) {
  const url = "https://www.codechef.com/users/" + uname;


  let arr = []
  const response = await request({
    url: url,
    headers: {},
    gzip: true,
  });
  code = qCode;
  console.log("--> Getting "+code);
  let $ = cheerio.load(response);

  let college = $('ul[class= "side-nav"]').text()
  //console.log(college)
  var a = college.split("     ");
  for (var i = 3; i <= a.length; i++) {
    if (a[i] >= "    ") {
      var s1 = "";
      s1 = a[i]

      arr.push({
        s1
      });
    }
  }
  arr.pop();
  arr.pop();


  let name = $('div[class= "user-details-container plr10"]>header>h2').text().trim();
  let star = $('span[class= "rating"]').text().trim();
  let country = $('span[class= "user-country-name"]').text().trim();

  let global_Rating = $('a[href= "/ratings/all"]>strong').text().trim();
  let country_rating = $('a[href= "/ratings/all?filterBy=Country%3DIndia"]>strong').text().trim();
  let solved = $('div[class="content"]>h5').text();

  var src = $('div[class = "user-details-container plr10"]>header').attr("src");


  var s = 'a[href="/status/'
  s += code
  s += ',' + uname + '"]'

  let Assignment = $(s).text();
  if (Assignment == code) {
    Assignment = true
  } else {
    Assignment = false
  }
// return Assignment;
  var space = " ";

  // console.log("Name :" + space.repeat(17) + name)

  //////


  var d1 = JSON.stringify(arr[0]);
  var d2 = d1.split(":")
  var d3 = d2[1].replace("    ", "").replace('"', "")
  var d4 = d2[2]
  var d5 = d4.slice(0, -4);

  // console.log(d3 + " :" + space.repeat(21 - (d3.length)) + d5)
  /////////////

  var e1 = JSON.stringify(arr[1]);
  var e2 = e1.split(":")
  var e3 = e2[1].replace("  ", "").replace('"', "")
  var e4 = e2[2]
  var e5 = e4.slice(2, -4);

  // console.log(e3 + " :" + space.repeat(21 - (e3.length)) + e5)


  ///////
  var a1 = JSON.stringify(arr[2]);
  var a2 = a1.split(":")
  var a3 = a2[1].replace("  ", "").replace('"', "")
  var a4 = a2[2]
  var a5 = a4.slice(0, -4);

  // console.log(a3 + " :" + space.repeat(21 - (a3.length)) + a5)
  // //////////


  var f1 = JSON.stringify(arr[3]);
  var f2 = f1.split(":")
  var f3 = f2[1].replace("  ", "").replace('"', "")
  var f4 = f2[2]
  var f5 = f4.slice(0, -4);

  // console.log(f3 + " :" + space.repeat(21 - (f3.length)) + f5)



  ////////
  var b1 = JSON.stringify(arr[4]);
  var b2 = b1.split(":")
  var b4;
  var b3 = b2[1].replace("  ", "").replace('"', "")
  if (b3 == "Link") {
    var b4 = b2[2] + b2[3]
  } else {
    var b4 = b2[2]
  }
  var b5 = b4.slice(0, -4);
  // console.log(b3 + " :" + space.repeat(21 - (b3.length)) + b5)



  var c1 = JSON.stringify(arr[5]);
  var c2 = c1.split(":")
  var c3 = c2[1].replace("  ", "").replace('"', "")
  var c4 = c2[2]
  var c5 = c4.slice(0, -4);
  // console.log(c3 + " :" + space.repeat(21 - (c3.length)) + c5)

  if (arr.length > 6) {
    var f1 = JSON.stringify(arr[6]);
    var f2 = f1.split(":")
    var f3 = f2[1].replace("  ", "").replace('"', "")
    var f4 = f2[2]
    var f5 = f4.slice(0, -4);
    // console.log(f3 + " :" + space.repeat(21 - (f3.length)) + f5)
  }

  if (arr.length > 7) {
    var g1 = JSON.stringify(arr[7]);
    var g2 = g1.split(":")
    var g3 = g2[1].replace("  ", "").replace('"', "")
    var g4 = g2[2]
    var g5 = g4.slice(0, -4);
    // console.log(g3 + " : " + g5)
  }

  // console.log("Assignment :" + space.repeat(11) + Assignment)


  return Assignment;


}


// let sol = getChefInfo("vanshtiwari", "MARM");
// sol.then((s)=>{
//   console.log(s);
// }).catch((e)=>{
//   console.log(e);
// })
module.exports = {
  getChefInfo
};