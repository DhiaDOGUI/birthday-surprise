///countdown cards scripts 
const GF_BDAY={month: 10, day:1};
const ANNIV = {month:12, day:14};
const MY_BDAY = {month: 4, day:27};
const START_DATE= new Date('2022-12-14');
const today = new Date();

function nextOccurence(m, d, fromDate){
    const year= fromDate.getFullYear();
    let candidate = new Date(year, m-1, d, 0, 0, 0);
    if (candidate < fromDate){
        candidate= new Date(year+1,m-1, d,0,0,0);
    }
    return candidate;
}

function formatRemaining(ms){
    if (ms <=0) return 'Today!';
    const s= Math.floor(ms / 1000);
    const days = Math.floor(s/ 86400);
    const hours= Math.floor((s% 86400) / 3600);
    const mins= Math.floor((s%3600) / 60);
    const secs= s % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
}

function updateTimers(){
    const now= new Date();
    const bnext= nextOccurence(GF_BDAY.month, GF_BDAY.day,now);
    const birthdayCount= document.getElementById('birthday-count');
    document.getElementById('birthday-next').textContent= bnext.toDateString();

    if(now.getMonth() === GF_BDAY.month -1 && now.getDate()=== GF_BDAY.day){
        birthdayCount.textContent= "Happy Birthday my Love!";

    } else {
        birthdayCount.textContent= formatRemaining(bnext - now);
    }

    const anext = nextOccurence(ANNIV.month, ANNIV.day, now);
    const anniversaryCount = document.getElementById('anniv-count');
    document.getElementById('anniv-next').textContent= anext.toDateString();
     if(now.getMonth()=== ANNIV.month-1 && now.getDate()=== ANNIV.day){
        anniversaryCount.textContent="Happy Anniversary!!";

     } else {
        anniversaryCount.textContent= formatRemaining(anext - now);

     }

     const mnext = nextOccurence(MY_BDAY.month, MY_BDAY.day, now);
     const myBirthdayCount = document.getElementById('mybirthday-count');
     document.getElementById('mybirthday-next').textContent= mnext.toDateString();
     if(now.getMonth()=== MY_BDAY.month-1 && now.getDate()=== MY_BDAY.day){
        myBirthdayCount.textContent="It's my Birthday too!!";

     } else {
        myBirthdayCount.textContent= formatRemaining(mnext - now);

     }

     const diff= now - START_DATE;
     const days= Math.floor(diff/ (1000* 60 * 60*24));
     document.getElementById('together-days').textContent= `${days}days`;
     document.getElementById('together-seconds').textContent= `${Math.floor(diff / 1000)}seconds`;
}
setInterval(updateTimers, 1000);
updateTimers();

// show card only on birthday 
const idBday =today.getMonth()=== GF_BDAY.month -1 && today.getDate()===GF_BDAY.day;
if (idBday){
    document.getElementById("birthday-card").style.display='block';
}

// rotating image gallery

const carousel= document.getElementById('carousel');
const imageFolder = 'imgs/';
const images = [
    'img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg','img6.jpg','img7.jpg','img8.jpg','img9.jpg','img10.jpg'
];

const radius = 180;
const centerX= 250;
const centerY= 250;

images.forEach((src,i) => {
    const img = document.createElement('img');
    img.src= imageFolder+src;
    const angle = (i / images.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) - 50;
    const y = centerY + radius * Math.sin(angle) - 50;
    img.style.left= x + 'px';
    img.style.top= y + 'px';
    carousel.appendChild(img);

});

//gallery by date
const gallery=document.getElementById('gallery');
const expandedView = document.getElementById('expanded-view');
const expandedImg = document.getElementById('expanded-img');
const closeBtn = document.getElementById('close-expanded');

const PHOTOS={
    "2023-12": ["photos/2023-12/1.jpg", "photos/2023-12/2.jpg"],
    "2024-02": ["photos/2024-02/3.jpg"],
    "2024-03": ["photos/2024-03/4.jpg"],
    "2024-04": ["photos/2024-04/5.jpg","photos/2024-04/6.jpg"],
    "2024-05": ["photos/2024-05/7.jpg","photos/2024-05/8.jpg","photos/2024-05/9.jpg","photos/2024-05/10.jpg"],
    "2024-06": ["photos/2024-06/11.jpg","photos/2024-06/12.jpg"],
    "2024-10": ["photos/2024-10/13.jpg"],
    "2025-04": ["photos/2025-04/14.jpg","photos/2025-04/15.jpg"],
    "2025-05": ["photos/2025-05/16.jpg","photos/2025-05/17.jpg","photos/2025-05/18.jpg"],
    "2025-06": ["photos/2025-06/19.jpg"],
    "2025-09": ["photos/2025-09/20.jpg","photos/2025-09/21.jpg"],
    "2025-10": ["photos/2025-10/22.jpg","photos/2025-10/23.jpg"],
    "2025-12": ["photos/2025-12/24.jpg","photos/2025-12/25.jpg","photos/2025-12/26.jpg"],
    "2026-01": ["photos/2026-01/27.jpg","photos/2026-01/28.jpg","photos/2026-01/29.jpg"],
    "2026-02": ["photos/2026-02/30.jpg","photos/2026-02/31.jpg"],
    "2026-03": ["photos/2026-03/32.jpg","photos/2026-03/33.jpg"]
};

// Carousel creator
function createCarousel(images){
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel';
    const track= document.createElement('div');
    track.className= 'carousel-track';

    images.forEach(src => {
        const slide = document.createElement('div');
        slide.className='carousel-slide';
        const img = document.createElement('img');
        img.src=src;
        img.addEventListener('click',()=>{
            expandedImg.src=src;
            expandedView.style.display = 'flex';
        });
        slide.appendChild(img);
        track.appendChild(slide);
    });

    wrapper.appendChild(track);

    if (imageFolder.length > 1) {
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        images.forEach((__,i) => {
            const btn = document.createElement('button');
            if (i === 0) btn.classList.add('active');
            btn.addEventListener('click',() => {
                track.style.transform = `translateX(-${i * 112}px)`;
                nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            nav.appendChild(btn);
        });
        wrapper.appendChild(nav);

    }
    return wrapper;
}

// Build gallery 
Object.keys(PHOTOS).sort((a,b) => b.localeCompare(a)).forEach(key => {
    const [y,m] = key.split('-');
    const section = document.createElement('section');
    section.className='month card';
    const h = document.createElement('h3');
    h.textContent = `${y} - ${new Date(y,Number(m) - 1,1).toLocaleString(undefined,{month:'long'})}`;
    section.appendChild(h);

    if (PHOTOS[key].length <= 1){
        const thumbs = document.createElement('div');
        thumbs.className = 'thumbs';
        PHOTOS[key].forEach(src => {
            const fig = document.createElement('figure');
            fig.className ='polaroid';
            const img = document.createElement('img');
            img.src = src;
            img.addEventListener('click',() =>{
                expandedImg.src = src;
                expandedView.style.display = 'flex';
            });
            fig.appendChild(img);
            thumbs.appendChild(fig);
        });
        section.appendChild(thumbs);
    } else {
        section.appendChild(createCarousel(PHOTOS[key]));
    }
    gallery.appendChild(section);
});

// Close expanded view 
closeBtn.addEventListener('click', () => expandedView.style.display = 'none');