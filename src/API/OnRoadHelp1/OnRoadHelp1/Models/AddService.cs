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
    
    public partial class AddService
    {
        public int id { get; set; }
        public string Service_Name { get; set; }
        public string Service_Type { get; set; }
        public Nullable<double> lat { get; set; }
        public Nullable<double> lon { get; set; }
        public Nullable<int> urid { get; set; }
        public Nullable<System.DateTime> DateTime { get; set; }
    }
}
