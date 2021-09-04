using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public struct GroupWithIcon
    {
        public Group Group;

        public GroupWithIcon(Group group, string iconURL)
        {
            Group = group;
            Group.IconURL = iconURL;
        }
    }
}
