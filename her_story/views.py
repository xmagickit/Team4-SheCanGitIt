from django.shortcuts import render

def home_view(request):
    return render(request, 'base.html')

def retro_computer_view(request):
    # List of women pioneers in technology
    pioneers = [
        {
            "name": "Sister Mary Kenneth Keller",
            "years": "1913–1985",
            "interesting": "First American woman to earn a Ph.D. in Computer Science (1965).",
            "contribution": "Worked on the BASIC programming language at Dartmouth, which played a huge role in making computing more accessible.",
            "fun_fact": "As a nun and educator, she was a strong advocate for teaching computer science in schools, emphasizing that computers should be used to serve humanity."
        },
        {
            "name": "Evelyn Berezin",
            "years": "1925–2018",
            "interesting": "Sometimes called the \"Mother of Word Processing.\"",
            "contribution": "Designed the first computerized word processor in the late 1960s, revolutionizing office work and text editing.",
            "fun_fact": "She also built the first computerized airline reservation system, used by United Airlines."
        },
        {
            "name": "Carol Shaw",
            "years": "1955– ",
            "interesting": "One of the first female video game designers and programmers.",
            "contribution": "Worked at Atari and Activision, creating games like \"3-D Tic-Tac-Toe\" (1978) and \"River Raid\" (1982).",
            "fun_fact": "She studied computer science at UC Berkeley, an unusual path for women in the 1970s, and helped break barriers in the gaming industry."
        },
        {
            "name": "Radia Perlman",
            "years": "1951– ",
            "interesting": "Known as the \"Mother of the Internet.\"",
            "contribution": "Invented the Spanning Tree Protocol (STP), fundamental to network switching. Her work made today's internet routing more robust.",
            "fun_fact": "She also created a child-friendly version of the educational language LOGO, showing her passion for making tech accessible to all ages."
        },
        {
            "name": "Dr. Gladys West",
            "years": "1930– ",
            "interesting": "Her mathematical modeling laid the groundwork for GPS technology.",
            "contribution": "As a mathematician at the U.S. Naval Proving Ground, she developed complex algorithms that accurately model Earth's shape—crucial for GPS.",
            "fun_fact": "Despite her monumental contributions, her story wasn't widely known until much later in her life."
        },
        {
            "name": "The ENIAC Six",
            "years": "1940s",
            "interesting": "Six women who programmed the ENIAC, one of the earliest general-purpose electronic computers (built during WWII).",
            "members": ["Jean Jennings Bartik", "Kathleen McNulty", "Betty Snyder Holberton", "Frances Bilas Spence", "Ruth Lichterman Teitelbaum", "Marlyn Wescoff Meltzer"],
            "contribution": "Programmed the first all-electronic programmable computer, which was used to calculate artillery firing tables for the U.S. Army.",
            "fun_fact": "They were originally called \"subprofessionals\" or \"clerks\" and received little public credit until historians uncovered their critical role decades later."
        },
        {
            "name": "Stephanie Shirley",
            "years": "1933– ",
            "interesting": "Founded a software company in the 1960s that primarily employed women working from home—revolutionary for its time.",
            "contribution": "Helped normalize flexible and remote work in tech, well before it was common.",
            "fun_fact": "She often signed her name \"Steve\" on business correspondences to overcome gender bias."
        },
        {
            "name": "Annie Easley",
            "years": "1933–2011",
            "interesting": "NASA computer scientist, mathematician, and rocket scientist.",
            "contribution": "Worked on technologies for spaceflight and alternative energy at NASA (including battery tech that led to modern hybrid vehicles).",
            "fun_fact": "She started her career as a \"human computer,\" manually performing complex calculations before electronic computers took over."
        },
        {
            "name": "Margaret Hamilton",
            "years": "1936– ",
            "interesting": "Led the team that developed on-board flight software for NASA's Apollo missions.",
            "contribution": "Coined the term \"software engineering\" and helped the Apollo 11 mission land on the Moon.",
            "fun_fact": "Her rigorous approach to software reliability was a big reason the Apollo missions succeeded without catastrophic software failures."
        },
        {
            "name": "The Top Secret Rosies",
            "years": "1940s",
            "interesting": "A group of women recruited by the U.S. Army during WWII to calculate ballistics trajectories.",
            "contribution": "Their advanced math skills and calculations eventually led to the earliest digital computing efforts.",
            "fun_fact": "They worked in secrecy and were largely unrecognized until documents were declassified decades later."
        }
    ]
    
    return render(request, 'her_story/retro_computer.html', {'pioneers': pioneers})