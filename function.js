if(Month(GetCurrentDateTimeUtc()) == 1, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 0, 8), 
ToString(ToInt(Substring(State.varCurrentISO, 0, 4))-1) + "-12-") , 
if(Month(GetCurrentDateTimeUtc()) == 2, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-01-") , 
if(Month(GetCurrentDateTimeUtc()) == 3, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-02-") , 
if(Month(GetCurrentDateTimeUtc()) == 4, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-03-") , 
if(Month(GetCurrentDateTimeUtc()) == 5, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-04-") , 
if(Month(GetCurrentDateTimeUtc()) == 6, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-05-") , 
if(Month(GetCurrentDateTimeUtc()) == 7, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-06-") , 
if(Month(GetCurrentDateTimeUtc()) == 8, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-07-") , 
if(Month(GetCurrentDateTimeUtc()) == 9, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-08-") , 
if(Month(GetCurrentDateTimeUtc()) == 10, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-09-") , 
if(Month(GetCurrentDateTimeUtc()) == 11, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-10-") , 
if(Month(GetCurrentDateTimeUtc()) == 12, Replace(State.varCurrentISO, Substring(State.varCurrentISO, 4, 8), "-11-") , 
""
))))))))))))




"2023-03-26T06:59:06.666Z"