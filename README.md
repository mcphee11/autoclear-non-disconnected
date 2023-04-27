# autoclear-non-disconnected
This is an example on how you can clear out interactions that an agent does not disconnect before they logout. This is designed as an example only and requires you to already have experience with Genesys Cloud.

## The issue...
Often agents just close the browser without actually "Disconnecting" digital interactions. While there is a feature to auto "wrap-up" interactions if disconnected but not wrapped up to then reduce ACW on these interaction that are not "Discconected" this will not work. Hence this below "Workflow" that will automate this process for you and transfer interactions in this state into a queue of your choice. I recommend having a specifc "Escalation" queue for this with users such as supervisors in the queue to anser interactions as well as take note of who the agent was that did not follow the correct process so training can be implemented to stop it happening in the first place.

## Step 1

Import the 6x DataActions into your environment ensuring they are imported into a "Genesys Cloud DataAction" type as these are all calls back into the Genesys Cloud environment itself.

  1: ["Get-Non-Disconnected-Interactions-UserIds"](/docs/dataActions/Get-Non-Disconnected-Interactions-UserIds.json)

  2: ["Get-Non-Disconnected-User-ConversationIds"](/docs/dataActions/Get-Non-Disconnected-User-ConversationIds.json)

  3: ["Get-Non-Disconnected-ParticipantId"](/docs/dataActions/Get-Non-Disconnected-ParticipantId.json)

  4: ["Get-Non-Disconnected-Replace"](/docs/dataActions/Get-Non-Disconnected-Replace.json)

  5: ["Get-Non-Disconnected-Trigger-Workflow"](/docs/dataActions/Get-Non-Disconnected-Trigger-Workflow.json)

  6: ["Get-Server-Time-ISO"](/docs/dataActions/Get-Server-Time-ISO.json)

Also ensure you "Publish" these so tehy can be used in the flow later on.

## Step 2

Create a Queue you want to transfer these interactions to and if you already have a queue you want ot use go to the queue and get the "queueId" from the URL copy this down for later

![](/docs/images/escalation.png?raw=true)

## Step 3

Create a "Work Flow" in arcitect and import the one i have built out at ["WorkFlow download"](/docs/flow/Get%20Non%20Disconnected%20Interactions_v1-0.i3WorkFlow) you will need to update the queueId with our one form above as well as there are 2x options "Log into Chat.." that are at the end of the flow these can be removed but i often use this technique to log messages into my debugging chat room for details on this i have a repo [here](https://github.com/mcphee11/architect-logging) otherwise you can simpily delete them but some logging or notification might be useful eg agentless email or sms.

![](/docs/images/flow.png?raw=true)

The most complex part of this flow is the varStartTime creation... I have put this below for reference but its already in the flow.

    if(Month(GetCurrentDateTimeUtc()) == 1, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 0, 6), ToString(ToInt(Substring(State.varCurrentISO, 0, 4))-1) + "-12-31") , if(Month(GetCurrentDateTimeUtc()) == 2, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-01-31") , if(Month(GetCurrentDateTimeUtc()) == 3, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-02-28") , if(Month(GetCurrentDateTimeUtc()) == 4, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-03-31") , if(Month(GetCurrentDateTimeUtc()) == 5, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-04-30") , if(Month(GetCurrentDateTimeUtc()) == 6, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-05-31") , if(Month(GetCurrentDateTimeUtc()) == 7, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-06-30") , if(Month(GetCurrentDateTimeUtc()) == 8, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-07-31") , if(Month(GetCurrentDateTimeUtc()) == 9, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-08-31") , if(Month(GetCurrentDateTimeUtc()) == 10, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-09-30") , if(Month(GetCurrentDateTimeUtc()) == 11, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-10-31") , if(Month(GetCurrentDateTimeUtc()) == 12, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 6), "-11-30") , "not found"))))))))))))

Dont forget you will need to update the DataActions with your ones that you inported before as well as then Publish the flow. Onc eyou have done this Copy the flowId like above with the queueId from the URL

## Step 4

Now you can test the flow. Ensure a Agent has a interaction active then close the browser. for example start and outbound ACD email and then close the browser for that Agent NOTE: Dont click "Disconnect" keep it active. It will take a few seconds for the solution to put the agent as "Offline" so wait a min then test the flow buy trigging the DataAction

![](/docs/images/trigger.png?raw=true)

Remember you will need to put your own "flowId" in the input for the test. If you are onQueue and in the "Escalation" queue or whatever you decided to use for the queueId replace then after a few seconds you should get the interaction alerting on your agent.

To make this an automated process once all the testing is completed and successful you can add a DataAction at the end of the Workflow to trigger itself after a amount of time for example 5min. This way the check will run by itself every 5min. Becareful not to make it run to often and go over API rate limiting or API usage. personally id NOT go any lower then 2min for these reasons.