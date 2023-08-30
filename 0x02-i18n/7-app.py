#!/usr/bin/env python3
""" Infer appropriate time zone """

from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
import pytz
from datetime import datetime

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """ Config class for Babel object """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """ GET locale from request URL """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user(login_as):
    """ Mock loggin in """
    users = {
        1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
        2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
        3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
        4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
    }
    if login_as in users:
        return users.get(login_as)
    return None


@app.before_request
def before_request():
    """ Find a user if any, and set it as a global on flask.g.user """
    login_as = request.args.get('login_as')
    if login_as:
        user = get_user(int(login_as))
        if user:
            g.user = user


@app.route('/')
def index():
    """ GET /
    Return:
      - 6-index.html
    """
    return render_template('6-index.html')


@babel.timezoneselector
def get_timezone():
    """ Infer appropriate time zone """
    if request.args.get('timezone'):
        try:
            return pytz.timezone(request.args.get('timezone'))
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    if g.user:
        timezone = g.user.get('timezone')
        if timezone:
            try:
                return pytz.timezone(timezone)
            except pytz.exceptions.UnknownTimeZoneError:
                pass
    return pytz.timezone(app.config['BABEL_DEFAULT_TIMEZONE'])


@app.template_filter('datetime')
def format_datetime_filter(value, format='medium'):
    """ Format a datetime to a different format """
    if format == 'full':
        format = "EEEE MMMM, d, y 'at' h:mma"
    elif format == 'medium':
        format = "EE MM, dd, y h:mma"
    return format_datetime(value, format)


if __name__ == "__main__":
    app.run(debug=True)
