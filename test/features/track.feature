Feature: This is an track event api service
For tracking event from application
Scenario: Content view event track
	Given a valid json
	When track api is invoke with POST
	Then event should be validated and stored