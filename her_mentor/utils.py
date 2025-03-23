from .models import Mentor, Notification

def match_mentors(skill_input):
    """
    Returns a list of mentors sorted by how well they match the given skills.
    """
    skill_input = [skill.strip().lower() for skill in skill_input.split(",")]
    
    mentors = Mentor.objects.all()
    mentor_scores = []

    for mentor in mentors:
        mentor_skills = mentor.get_skill_list()
        match_score = sum(skill in mentor_skills for skill in skill_input)  # Count matching skills
        
        if match_score > 0:  # Only include mentors with at least one matching skill
            mentor_scores.append((mentor, match_score))

    # Sort mentors by number of matched skills, then by experience level
    mentor_scores.sort(key=lambda x: (-x[1], x[0].experience_level))

    return [mentor[0] for mentor in mentor_scores]


def send_notification(user, message):
    Notification.objects.create(user=user, message=message)
