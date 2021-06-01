using System.Windows.Forms;

namespace SetupTest
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            // Set the values defined under Project - Properties - Settings
            this.Text = Properties.Settings.Default.FormTitle;
            this.textBox1.Text = Properties.Settings.Default.MyName;
        }

        private void button1_Click(object sender, System.EventArgs e)
        {
            this.Close();
        }
    }
}
