import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Gmail configuration
SENDER_EMAIL = "tacobaguet@gmail.com"
SENDER_PASSWORD = "hdqzmztcskfwstam"  # App password with no spaces

def send_verification_email(to_email, username):
    subject = "TacoBaguet™ Account Verification"
    body = f"""
Hi {username},

Welcome to TacoBaguet™ Hub!
Please verify your account by replying to this email.

If you did not register, ignore this email.

Cheers,
TacoBaguet™ Team
"""

    msg = MIMEMultipart()
    msg["From"] = SENDER_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, to_email, msg.as_string())
        print(f"✅ Verification email sent to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False

# Quick test if run directly
if __name__ == "__main__":
    test_email = "tacobaguetat@gmail.com"
    send_verification_email(test_email, "TestUser")
