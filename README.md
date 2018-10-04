Hoe front end compilen?
1. Open de terminal in vs code (zie tabs links bovenaan)
2. Kijk of je in de goede folder zit (C:/Users/\<username\>/\<whatever\>/Gamification-Infoland, dus niet in node_modules)
3. Type de volgende command elke keer als je een error hebt nadat je een git sync hebt gedaan:
    yelp
4. Om de front end makkelijk te developen is het handig om een server op te starten die zichzelf update als er een bestand is veranderd, dit kan door middel van de volgende command:
    yelp run dev
Dit start een server op, normaal gesproken op localhost:8080, zo niet dan staat het gwn in de console.
5. Als er iets specieks moet worden getest met de 'echte' nodejs server, run dan de volgende command:
    yelp run build
Hiermee worden de vue bestanden gecompiled zodat die gebruikt kunnen worden door de nodejs server.

Voorlopig moet alle frontend scripting in javascript gebeuren, tenzij we snel nog een manier vinden om dat in typescript te doen. Opzich is dit geen probleem, maar typescript is altijd duidelijker en heeft betere typefout prevention. :)

Info over backend compilen voeg ik later wel eens toe,

Groetjes Pepijn
