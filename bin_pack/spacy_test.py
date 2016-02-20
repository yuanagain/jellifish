'''
INSTALLATION INSTRUCTIONS FOR SPACY

1. make sure you have "build-essential python-dev"

2. Then run:

$ pip install spacy
$ python -m spacy.en.download

'''
from spacy.en import English
from spacy.parts_of_speech import ADV, VERB
import TaskSequence
import DBMClient

nlp = English()
doc = nlp(u'Bring a pot of water to boil over high heat. Salt \
the water liberally. This is how pasta gets salted, \
so don’t be shy! Most won’t end up in the pasta. \
Cook the pasta according to the package \
directions. I prefer my pasta with some bite, so \
I drain the pasta just before it’s finished so it \
doesn’t get mushy when I add it to the vegetable \
pan to cook slightly more. \
Meanwhile, melt a tablespoon of butter in a pan \
on medium heat. Add the garlic and chili flakes. \
Let them sizzle for 30 seconds to a minute, \
then add the zucchini. Stir the vegetables to \
coat them. Cook for 5 to 7 minutes, stirring \
occasionally, until some of the water has cooked \
off and the veggies are tender when stabbed \
with a fork. Young summer zucchini doesn’t \
need much cooking. Add the lemon zest. Stir! \
Drain the cooked fettuccine and add it to the \
zucchini pan along with the rest of the butter, \
the cream, and most of the Romano cheese. Toss \
the fettuccine around the pan to get everything \
mixed. Add salt to taste and lots of freshly \
ground pepper. Top with a bit more cheese and \
serve immediately.')


sentences = doc.sents
list_of_nodes = []
for s in sentences:
    print(s)
    valid = False
    while(valid == False):
        begin_anew = input('Skip (y/n)? : ')
        if(begin_anew == 'y' or begin_anew == 'n'):
            valid = True
        else:
            print('Please enter y or n!')
    if (begin_anew == 'y'):
        pass
    elif (begin_anew == 'n'):
        tname = input("Name of task : ")
        ttime = input ("Time for task (min) : ")
        tmin = input ("Minimum wait time : ")
        tmax = input ("maximum wait time : ")
        tdesc = s
        tn = TaskSequence.TaskNode(name = tname, time = ttime,\
            descr = tdesc, min_wait = tmin, max_wait = tmax)
        list_of_nodes.append(tn)

recipe_name = input ("what is the name of this recipe : ")

client = DBMClient.DBMClient("tigerlaunch.db")
recipe = TaskSequence.TaskSequence(name = recipe_name, tasks = list_of_nodes)
client.add_recipe(recipe)
client.fetch_recipe(recipe_name).print_dump()

'''
for token in doc:
    if (token.pos == VERB and token.pos != ADV):
        print(token.orth_)
'''