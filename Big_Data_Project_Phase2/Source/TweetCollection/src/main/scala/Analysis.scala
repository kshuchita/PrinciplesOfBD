import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.SparkConf
import org.apache.spark.SparkContext
import org.apache.hadoop.util
import org.apache.spark.sql.SQLContext

object Analysis {
  def main(args: Array[String]) {
    System.setProperty("hadoop.home.dir","C:\\Python35\\Utils")
    // initialise spark context
    val conf = new SparkConf().setAppName("CountSpark").setMaster("local[2]").set("spark.executor.memory","8g")
    val sc = new SparkContext(conf)

    val textFile = sc.textFile("C:\\Python35\\singer.Json")
    val sqlContext = new SQLContext(sc)
    val tweetsfile = sqlContext.read.json("C:\\Python35\\devices.json  ")



    tweetsfile.registerTempTable("querytable1")
    //val query = sqlContext.sql("select user.name, count(user.followers_count) as followersCount from querytable1 group by user.name order by followersCount desc limit 10")
   // val query = sqlContext.sql("select lang,avg(user.followers_count) as followers from querytable1 group by lang order by followers desc limit 10");
    //val query = sqlContext.sql("select user.name, user.followers_count,user.favourites_count,user.friends_count from querytable1 order by  user.followers_count desc limit 10");
    //val query = sqlContext.sql("SELECT MAX(retweeted_status.retweet_count) as maxretweetcnt , retweeted_status.text FROM querytable1 GROUP BY retweeted_status.text ORDER BY maxretweetcnt DESC LIMIT 10")
    //val query =  sqlContext.sql("SELECT user.time_zone, SUBSTR(created_at, 0, 9), COUNT(*) AS total_count FROM querytable1 WHERE user.time_zone IS NOT NULL GROUP BY user.time_zone, SUBSTR(created_at, 0, 9) ORDER BY total_count DESC LIMIT 15")
    //val query = sqlContext.sql("SELECT user.lang , COUNT(*) as cnt FROM querytable1 WHERE user.lang IS NOT NULL GROUP BY user.lang ORDER BY cnt DESC LIMIT 15")
    val query = sqlContext.sql("SELECT device , count(*) as cnt FROM querytable1 GROUP BY device ORDER BY cnt DESC")
    //val query = sqlContext.sql("SELECT count(*) , location from querytable1 GROUP BY location ORDER BY count(*) desc LIMIT 10")

    //val query = sqlContext.sql("SELECT singer , possibly_sensitive,count(*) as cnt FROM querytable1 WHERE possibly_sensitive GROUP BY singer, possibly_sensitive HAVING singer != '' ORDER BY cnt DESC")

    query.coalesce(1).write.json("C:\\Outputs\\sensitivee")



    query.show();

         val counts = textFile.flatMap(line => line.split(" "))
          .map(word => (word, 1))
        .reduceByKey(_ + _)
    counts.saveAsTextFile("C:\\Outputs\\TestLang")


  }
}

