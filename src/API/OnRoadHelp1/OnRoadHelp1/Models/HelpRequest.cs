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
    
    public partial class HelpRequest
    {
        public int Helpid { get; set; }
        public Nullable<int> u_id { get; set; }
        public string u_problem { get; set; }
        public Nullable<double> lat { get; set; }
        public Nullable<double> lon { get; set; }
        public string u_pcatagory { get; set; }
        public Nullable<int> ResponderId { get; set; }
        public string status { get; set; }
        public Nullable<double> UserRating { get; set; }
        public Nullable<double> RespRating { get; set; }
        public Nullable<System.DateTime> DateTime { get; set; }
    }
}
