OUR INSTITUTE - 4 About pages (each has its own hero, .jsx and .css)

1) Copy the 4 folders into  src/pages/about/

2) Add the routes in App.jsx:

   import History from "./pages/about/history/History";
   import PrincipalMessage from "./pages/about/principal-message/PrincipalMessage";
   import RankAccreditation from "./pages/about/rank-accreditation/RankAccreditation";
   import Alumni from "./pages/about/alumni/Alumni";

   <Route path="/about/history" element={<History />} />
   <Route path="/about/principal-message" element={<PrincipalMessage />} />
   <Route path="/about/rank-accreditation" element={<RankAccreditation />} />
   <Route path="/about/alumni" element={<Alumni />} />

   (These are the same links your Navbar already uses, so the Navbar needs no change.)

3) Hero photos - put wide photos (about 2.3:1, e.g. 1600x700) in public/images/:
   about-history.jpg, about-principal.jpg, about-rank.jpg, about-alumni.jpg
   A missing photo shows a navy gradient, so nothing looks broken.
   The Principal's portrait uses public/images/principal.png (same as Home).

4) Downloads in each sidebar still point to the old website. To host them yourself,
   copy the files to public/docs and change the OLD line / file paths at the top of each page.
   The Alumni registration form is a SAMPLE path (/docs/alumni-registration-form.pdf).

Text marked SAMPLE in the .jsx files is placeholder text (principal's message, alumni voices, timeline "Later years").
Hero: about 320px tall on desktop (Home is taller), 5:2 on phones/tablets; the two top pills are hidden at 900px and below.
