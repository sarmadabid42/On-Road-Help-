//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OnRoadHelp1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class HelpRequestAssigned
    {
        public int id { get; set; }
        public Nullable<int> HelpRequestId { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<System.DateTime> AssignedTime { get; set; }
        public string StatusFlag { get; set; }
    }
}
