import tweepy
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time

access_token = "4875580214-Xo4Wv2cz2D8dnNM1KTmPM5APNuOtB1gIOcOaXuM"
access_tokensecret = "suI93glRxpZtrEJpWRQxvgfZrzlCrTmxtSKvxhbUKAEQt"
consumer_key= "9twtGVvM5vld4fbpUXxNoQcMC"
consumer_secret = "RYJf5QD3wNtrSSM17LmTgWFsVCHhvSlItHMUq4kXvbl98izsMK"

class analytics(StreamListener):
	def on_data(self,data):
		try:
			saveFile = open('tweets.json','a')
			saveFile.write(data)
			saveFile.write(', \n')
			saveFile.close()
			return True

		except BaseException as except1:
			print ('data parsing error,',str(except1))
			time.sleep(5)

	def on_error(self,status):
		print (status)

verification = OAuthHandler(consumer_key,consumer_secret)
verification.set_access_token(access_token,access_tokensecret)
stream_twitter = Stream(verification,analytics())
stream_twitter.filter(track=['#trump','#donaldtrump ','#debate ','#republicans'])
